from flask import Flask, Blueprint, request, jsonify, Response, make_response
from models.GameModel import GameModel
from algos.NBAModel import NBAModel
from db import connect
from datetime import datetime
import pytz
from routes.responses import good_response, bad_response
import json
import pandas as pd
import requests
import io
from flask_cors import CORS, cross_origin


# Set the time zone to EST
est_tz = pytz.timezone('US/Eastern')



nba_blueprint = Blueprint('nba_blueprint', __name__)

@nba_blueprint.route('', methods=['GET'])
@cross_origin()
def get_games():
    # Connect to db
    connection = connect('games')
    # Get the current time in EST
    current_time_est = datetime.now(est_tz)
    formatted_time = str(current_time_est.strftime("%Y-%m-%d %I:%M:%S %p"))
       
    # get nba games
    games = list(connection.find({"sport": {'$eq': "nba"}}))
    data = []
    for element in games:
        element['_id'] = str(element['_id'])
        if datetime.strptime(element['date'], "%Y-%m-%d %I:%M:%S %p") > datetime.strptime(formatted_time, "%Y-%m-%d %I:%M:%S %p"):
            data.append(element)

    def sortDates(dict):
        return datetime.strptime(dict['date'], "%Y-%m-%d %I:%M:%S %p")
    
    data.sort(key=sortDates)

    try:
        return good_response(data)

    except Exception as e:
        return bad_response(e)


# API Call to retrieve historical data and update current games/bets/users to reflect final scores
@nba_blueprint.route('/update_games', methods=['GET', 'OPTIONS'])
@cross_origin()
def update_games():
    try: 
        db_hard_start = datetime(2023, 11, 7)

        # URL of the data
        url = 'https://sportsdatabase.com/NBA/query?output=default&sdql=date%2C+team%2C+site%2C+o%3Ateam%2C+total%2C+line%2C+line%20ave%20odds%2C+money%20line%2C+total%20over%20ave%20odds%2C+total%20under%20ave%20odds%2C++points%2C+o%3Apoints+%40season%3E2019&submit=++S+D+Q+L+%21++'

        # Send an HTTP GET request to the URL and get the response content
        response = requests.get(url)

        if response.status_code == 200:
            # Convert the response content to JSON format
            data1 = response.json()

            column_names = data1['headers']
            column_data = data1['groups'][0]['columns']

            data_transposed = list(map(list, zip(*column_data)))

            # Create a Pandas DataFrame from the transposed data
            df = pd.DataFrame(data_transposed)

            # Optionally, set column names
            df.columns = column_names
        
        else:
            print('Failed to fetch the nba data.')

        

        # Date formatting, get rows before today
        new_df = df
        new_df['date'] = pd.to_datetime(new_df['date'], format='%Y%m%d')

        # Get today's date
        today = datetime.now()

        before_today_df = new_df
        
        # Rename columns
        before_today_df = before_today_df.rename(columns={'team': 'Home Team', 'o:team': 'Away Team','points': 'Score', 'o:points': 'Opp Score'})
        print(before_today_df)

        before_today_df = before_today_df.dropna()

        home_df = before_today_df[before_today_df['site'] == 'home']
        away_df = before_today_df[before_today_df['site'] == 'away']

        away_mls = away_df['money line'].tolist()
        away_lines = away_df['line'].tolist()
        away_lines_odds = away_df['line ave odds'].tolist()

        # Renaming
        home_df['Away Odds Close'] = away_mls
        home_df['Away Line Close'] = away_lines
        home_df['Away Line Odds Close'] = away_lines_odds

        home_df = home_df.rename(columns={'Score': 'Home Score', 'Opp Score': 'Away Score', 'date': 'Date', 'total': 'Total Score Close', 'money line': 'Home Odds Close', 'line': 'Home Line Close', 'line ave odds': 'Home Line Odds Close', 'total over ave odds' :'Total Score Over Close', 'total under ave odds' : 'Total Score Under Close'})
        # Drop the site column
        home_df = home_df.drop('site', axis=1)

        # Define a function to extract the last element from a list
        get_last_element = lambda x: x[-1]

        # Apply the function to the list columns
        home_df['Home Line Odds Close'] = home_df['Home Line Odds Close'].apply(get_last_element)
        home_df['Away Line Odds Close'] = home_df['Away Line Odds Close'].apply(get_last_element)
        home_df['Total Score Over Close'] = home_df['Total Score Over Close'].apply(get_last_element)
        home_df['Total Score Under Close'] = home_df['Total Score Under Close'].apply(get_last_element)

        # Even to +100
        home_df.loc[home_df['Home Odds Close'] == 'even', 'Home Odds Close'] = '100'
        home_df.loc[home_df['Away Odds Close'] == 'even', 'Away Odds Close'] = '100'

        # Function to convert American odds to decimal odds
        def american_to_decimal(american_odds):
            american_odds = pd.to_numeric(american_odds)  # Convert the string to numeric
            if american_odds > 0:
                return round((american_odds / 100) + 1, 2)
            elif american_odds < 0:
                return round((-100 / american_odds) + 1, 2)
            else:
                return 1  # Even (American odds of 0)
            
        # Apply the conversion function to the American Odds columns
        home_df['Home Odds Close'] = home_df['Home Odds Close'].apply(american_to_decimal)
        home_df['Away Odds Close'] = home_df['Away Odds Close'].apply(american_to_decimal)
        home_df['Home Line Odds Close'] = home_df['Home Line Odds Close'].apply(american_to_decimal)
        home_df['Away Line Odds Close'] = home_df['Away Line Odds Close'].apply(american_to_decimal)
        home_df['Total Score Over Close'] = home_df['Total Score Over Close'].apply(american_to_decimal)
        home_df['Total Score Under Close'] = home_df['Total Score Under Close'].apply(american_to_decimal)

        home_df['Total Score'] = home_df['Home Score'] + home_df['Away Score']

        # Change team names to be accurate
        nba_teams = {
            'Hawks': 'Atlanta Hawks',
            'Celtics': 'Boston Celtics',
            'Nets': 'Brooklyn Nets',
            'Hornets': 'Charlotte Hornets',
            'Bulls': 'Chicago Bulls',
            'Cavaliers': 'Cleveland Cavaliers',
            'Mavericks': 'Dallas Mavericks',
            'Nuggets': 'Denver Nuggets',
            'Pistons': 'Detroit Pistons',
            'Warriors': 'Golden State Warriors',
            'Rockets': 'Houston Rockets',
            'Pacers': 'Indiana Pacers',
            'Clippers': 'Los Angeles Clippers',
            'Lakers': 'Los Angeles Lakers',
            'Grizzlies': 'Memphis Grizzlies',
            'Heat': 'Miami Heat',
            'Bucks': 'Milwaukee Bucks',
            'Timberwolves': 'Minnesota Timberwolves',
            'Pelicans': 'New Orleans Pelicans',
            'Knicks': 'New York Knicks',
            'Thunder': 'Oklahoma City Thunder',
            'Magic': 'Orlando Magic',
            'Seventysixers': 'Philadelphia 76ers',
            'Suns': 'Phoenix Suns',
            'Trailblazers': 'Portland Trail Blazers',
            'Kings': 'Sacramento Kings',
            'Spurs': 'San Antonio Spurs',
            'Raptors': 'Toronto Raptors',
            'Jazz': 'Utah Jazz',
            'Wizards': 'Washington Wizards',
        }

        home_df['Home Team'] = home_df['Home Team'].map(nba_teams)
        home_df['Away Team'] = home_df['Away Team'].map(nba_teams)

        nba = NBAModel()
        nba.populateDB()

        # Function to format a date string from Mongo to excel format
        def convert_date_format(input_date):
            # Convert the input date string to a datetime object
            date_obj = datetime.strptime(input_date, '%Y-%m-%d %I:%M:%S %p')
            # Format the datetime object to '%Y-%m-%d' format
            formatted_date = date_obj.strftime('%Y-%m-%d')
            return formatted_date
        
        #Only keep rows after hard start
        filtered_df = home_df[home_df['Date'] > pd.to_datetime(db_hard_start)]
        print(filtered_df)

        # Update games in MongoDB with result
        connection = connect('games')

        # Get the current time in EST
        current_time_est = datetime.now(est_tz)
        formatted_time = str(current_time_est.strftime("%Y-%m-%d %I:%M:%S %p"))
        #print(formatted_time)   
        data = list(connection.find({"$and": [{'date': {"$lt": formatted_time}}, {"sport": {'$eq': "nba"}}, {"home_score": {'$eq': None}}, {"away_score": {'$eq': None}}]}))
        for element in data:
            element['_id'] = str(element['_id'])
            row = filtered_df[(filtered_df['Date'] == convert_date_format(element['date'])) & (filtered_df['Home Team'] == element['home_team']) & (filtered_df['Away Team'] == element['away_team'])]
            print(row)
            if len(row.index) > 0:
                
                ### Updating home and away scores
                element['home_score'] = int(row['Home Score'].values[0])
                element['away_score'] = int(row['Away Score'].values[0])
                connection.update_one({'game_id': element['game_id']}, {'$set': {"home_score": element["home_score"]}, '$currentDate': { 'lastUpdated': True }} )
                connection.update_one({'game_id': element['game_id']}, {'$set': {"away_score": element["away_score"]}, '$currentDate': { 'lastUpdated': True }} )

                connection_to_users = connect('users')
                connection_to_bets = connect('bets')

                #Update bets
                game_bets = connection_to_bets.find({'game_id': element['game_id']})
                for bet in game_bets:
                    if bet['actual_payout'] is None:
                        payout = 0
                        # Away ML bet
                        if bet['bet_type'] == 'Away':
                            if element['away_score'] > element['home_score']:
                                payout = bet['potential_payout']
                            elif element['away_score'] < element['home_score']:
                                payout = 0
                            else:
                                payout = bet['wager']

                        # Home ML bet
                        elif bet['bet_type'] == 'Home':
                            if element['home_score'] > element['away_score']:
                                payout = bet['potential_payout']
                            elif element['home_score'] < element['away_score']:
                                payout = 0
                            else:
                                payout = bet['wager']

                        # Away Spread
                        elif bet['bet_type'] == 'Away Line':                   
                            if element['home_score'] - element['away_score'] < element['away_spread']:
                                payout = bet['potential_payout']
                            elif element['home_score'] - element['away_score'] > element['away_spread']:
                                payout = 0
                            else:
                                payout = bet['wager']
                        # Home Spread
                        elif bet['bet_type'] == 'Home Line':                   
                            if element['away_score'] - element['home_score'] < element['home_spread']:
                                payout = bet['potential_payout']
                            elif element['away_score'] - element['home_score'] > element['home_spread']:
                                payout = 0
                            else:
                                payout = bet['wager']
                        # Over
                        elif bet['bet_type'] == 'Over':
                            if element['away_score'] + element['home_score'] > element['total']:
                                payout = bet['potential_payout']
                            elif element['away_score'] + element['home_score'] < element['total']:
                                payout = 0
                            else:
                                payout = bet['wager']
                        #Under
                        elif bet['bet_type'] == 'Under':
                            if element['away_score'] + element['home_score'] < element['total']:
                                payout = bet['potential_payout']
                            elif element['away_score'] + element['home_score'] > element['total']:
                                payout = 0
                            else:
                                payout = bet['wager']
                        # Update Bet actual payout value
                        connection_to_bets.update_one({'_id': bet['_id']}, {'$set': {"actual_payout": payout}, '$currentDate': { 'lastUpdated': True }} )

                        # Update corresponding account balance and lifetime winnings 
                        bet_account = list(connection_to_users.find({"username": bet['account_username']}))[0]
                        new_lifetime_winnings = float(bet_account['lifetime_winnings']) + float(payout)
                        new_current_balance = float(bet_account['current_balance']) + float(payout)
                        connection_to_users.update_one({'username': bet['account_username']}, {'$set': {"lifetime_winnings": new_lifetime_winnings}, '$currentDate': { 'lastUpdated': True }} )
                        connection_to_users.update_one({'username': bet['account_username']}, {'$set': {"current_balance": new_current_balance}, '$currentDate': { 'lastUpdated': True }} )

        return good_response("NBA Games were updated")
    
    except Exception as e:
        return bad_response(e)


        

        

        