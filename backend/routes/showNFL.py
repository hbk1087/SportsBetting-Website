from flask import Flask, Blueprint, request, jsonify, Response, make_response
from models.GameModel import GameModel
from algos.NFLModel import NFLModel
from db import connect
from datetime import datetime
import pytz
from routes.responses import good_response, bad_response
import json
import pandas as pd
import requests
import io


# Set the time zone to EST
est_tz = pytz.timezone('US/Eastern')



nfl_blueprint = Blueprint('nfl_blueprint', __name__)

@nfl_blueprint.route('/', methods=['GET'])
def get_games():
    # Connect to db
    connection = connect('games')
    # Get the current time in EST
    current_time_est = datetime.now(est_tz)
    formatted_time = str(current_time_est.strftime("%Y-%m-%d %I:%M:%S %p"))
    print(formatted_time)   
    data = list(connection.find({"$and": [{'date': {"$gt": formatted_time}}, {"sport": {'$eq': "nfl"}}]}))
    for element in data:
        element['_id'] = str(element['_id'])

    try:
        return good_response(data)

    except Exception as e:
        return bad_response(e)


# API Call to retrieve historical data and update current games/bets/users to reflect final scores
@nfl_blueprint.route('/update_games', methods=['GET'])
def update_games():
    try: 
        db_hard_start = datetime(2023, 10, 16)

        # URL of the Excel file hosted online

        url = 'https://www.aussportsbetting.com/historical_data/nfl.xlsx'

        # Send an HTTP GET request to the URL and get the response content
        response = requests.get(url)

        if response.status_code == 200:
            # Create a BytesIO object and load the response content into it
            excel_data = io.BytesIO(response.content)

            # Read the Excel data directly from the BytesIO object using pandas
            df = pd.read_excel(excel_data)
        
        else:
            print('Failed to fetch the Excel file.')

        nfl = NFLModel()
        nfl.populateDB()

        # Function to format a date string from Mongo to excel format
        def convert_date_format(input_date):
            # Convert the input date string to a datetime object
            date_obj = datetime.strptime(input_date, '%Y-%m-%d %I:%M:%S %p')
            # Format the datetime object to '%Y-%m-%d' format
            formatted_date = date_obj.strftime('%Y-%m-%d')
            return formatted_date
        
        #Only keep rows after hard start
        df['Date'] = pd.to_datetime(df['Date'])
        filtered_df = df[df['Date'] > pd.to_datetime(db_hard_start)]
        print(filtered_df)

        # Update games in MongoDB with result
        connection = connect('games')

        # Get the current time in EST
        current_time_est = datetime.now(est_tz)
        formatted_time = str(current_time_est.strftime("%Y-%m-%d %I:%M:%S %p"))
        print(formatted_time)   
        data = list(connection.find({"$and": [{'date': {"$lt": formatted_time}}, {"sport": {'$eq': "nfl"}}]}))
        for element in data:
            element['_id'] = str(element['_id'])
            row = filtered_df[(filtered_df['Date'] == convert_date_format(element['date'])) & (filtered_df['Home Team'] == element['home_team']) & (filtered_df['Away Team'] == element['away_team'])]
            if len(row.index) > 0:
                element['home_score'] = row['Home Score']
                element['away_score'] = row['Away Score']
                connection.update_one({'_id': element['_id']}, {'$set': element, '$currentDate': { 'lastUpdated': True }} )

                connection_to_users = connect('users')
                connection_to_bets = connect('bets')

                #Update bets
                game_bets = connection_to_bets.find({'game_id': element['game_id']})
                for bet in game_bets:
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
                        if element['home_score'] - element['away_score'] < element['away_spread_odds']:
                            payout = bet['potential_payout']
                        elif element['home_score'] - element['away_score'] > element['away_spread_odds']:
                            payout = 0
                        else:
                            payout = bet['wager']
                    # Home Spread
                    elif bet['bet_type'] == 'Home Line':                   
                        if element['away_score'] - element['home_score'] < element['home_spread_odds']:
                            payout = bet['potential_payout']
                        elif element['away_score'] - element['home_score'] > element['home_spread_odds']:
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
                    bet_account = list(connection_to_users.find({"username":bet['account_username']}))[0]
                    new_lifetime_winnings = bet_account['lifetime_winnings'] + payout
                    new_current_balance = bet_account['current_balance'] + payout
                    connection_to_users.update_one({'username': bet['account_username']}, {'$set': {"lifetime_winnings": new_lifetime_winnings}, '$currentDate': { 'lastUpdated': True }} )
                    connection_to_users.update_one({'username': bet['account_username']}, {'$set': {"current_balance": new_current_balance}, '$currentDate': { 'lastUpdated': True }} )

        return good_response("NFL Games were updated")
    
    except Exception as e:
        return bad_response(e)


        

        

        