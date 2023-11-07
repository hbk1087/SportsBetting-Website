import pandas as pd
import numpy as np
import json
import sklearn
import datetime
import io
import requests
from dotenv import load_dotenv
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.pipeline import make_pipeline
from models.GameModel import GameModel
from datetime import datetime
import pytz
from db import connect

class NFLModel:

    #model = 0

    def getTargets(self, df):
        return df[['Home Odds Close', 'Away Odds Close', 'Home Line Close', 'Away Line Close', 'Total Score Close']]

    # sets base_df, base df to train from
    def startUp(self):
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

        df1 = df[['Date', 'Home Team', 'Away Team', 'Home Score', 'Away Score','Home Odds Open' , 'Home Odds Close', 'Away Odds Open', 'Away Odds Close', 'Home Line Open', 'Home Line Close','Away Line Open','Away Line Close', 'Home Line Odds Close', 'Away Line Odds Close', 'Total Score Close', 'Total Score Over Close', 'Total Score Under Close']]

        base_df = df1.dropna()
        base_df['Total Score'] = base_df['Home Score'] + base_df['Away Score']
        self.base_df = base_df[['Date', 'Home Team', 'Away Team', 'Home Score', 'Away Score', 'Total Score', 'Home Odds Open','Home Odds Close', 'Away Odds Open','Away Odds Close', 'Home Line Open', 'Home Line Close', 'Away Line Open', 'Away Line Close', 'Home Line Odds Close', 'Away Line Odds Close', 'Total Score Close', 'Total Score Over Close', 'Total Score Under Close']]

    # Creates actual model self.model to be used in future
    def setModel(self):
        
        # Features and target
        X = self.getTargets(self.base_df)
        y = self.base_df[['Home Score', 'Away Score']]

        # Splitting data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Define the degree of the polynomial you want to fit (e.g., 2 for quadratic)
        degree = 1

        # Create a polynomial regression model
        polyreg = make_pipeline(PolynomialFeatures(degree), LinearRegression())

        # Train the model
        polyreg.fit(X_train, y_train)
        self.model = polyreg

        # Predict scores
        y_pred = polyreg.predict(X_test)


    def __init__(self):
        self.startUp()
        self.setModel()
        self.apiPredictAll()
        self.makeAllPretty()
        

    def apiPredictAll(self):
        load_dotenv()

        secret_key = os.getenv('API_KEY')
        # Replace this URL with the actual API URL you want to call
        api_url = f"https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey={secret_key}&regions=us&markets=h2h,spreads,totals&oddsFormat=decimal&bookmakers=fanduel"
        
        # Send a GET request to the API
        response = requests.get(api_url, timeout=3)

        self.j = response.json()

        df_api = pd.DataFrame.from_dict(self.j)
        

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            print(response.text)
        else:
            print(f"Request failed with status code {response.status_code}")
        
        away_ml_list = []
        home_ml_list = []
        away_spread_list = []
        away_spread_price_list = []
        home_spread_list = []
        home_spread_price_list = []
        over_total_list = []
        over_price_list = []
        under_total_list = []
        under_price_list = []

        error_rows = []

        for index, row in df_api.iterrows():
            try:

                # Get markets and home/away teams
                home_team = row['home_team']
                away_team = row['away_team']
                markets = row['bookmakers'][0]['markets']

                # ML 'h2h' market
                if markets[0]['key'] == 'h2h':
                    if markets[0]['outcomes'][0]['name'] == home_team:
                        home_ml = row['bookmakers'][0]['markets'][0]['outcomes'][0]['price']
                        away_ml = row['bookmakers'][0]['markets'][0]['outcomes'][1]['price']
                    else:
                        home_ml = row['bookmakers'][0]['markets'][0]['outcomes'][1]['price']
                        away_ml = row['bookmakers'][0]['markets'][0]['outcomes'][0]['price']

                if markets[1]['key'] == 'spreads':
                    if markets[1]['outcomes'][0]['name'] == home_team:

                        away_spread = row['bookmakers'][0]['markets'][1]['outcomes'][1]['point']
                        away_spread_price = row['bookmakers'][0]['markets'][1]['outcomes'][1]['price']
                        
                        
                        home_spread = row['bookmakers'][0]['markets'][1]['outcomes'][0]['point']
                        home_spread_price = row['bookmakers'][0]['markets'][1]['outcomes'][0]['price']
                    else:
                        away_spread = row['bookmakers'][0]['markets'][1]['outcomes'][0]['point']
                        away_spread_price = row['bookmakers'][0]['markets'][1]['outcomes'][0]['price']
                        
                        
                        home_spread = row['bookmakers'][0]['markets'][1]['outcomes'][1]['point']
                        home_spread_price = row['bookmakers'][0]['markets'][1]['outcomes'][1]['price']

                if markets[2]['key'] == 'totals':
                    if markets[2]['outcomes'][0]['name'] == 'Over':
                        over_total = row['bookmakers'][0]['markets'][2]['outcomes'][0]['point']
                        over_price = row['bookmakers'][0]['markets'][2]['outcomes'][0]['price']
                        
                        
                        under_total = row['bookmakers'][0]['markets'][2]['outcomes'][1]['point']
                        under_price = row['bookmakers'][0]['markets'][2]['outcomes'][1]['price']
                    else:
                        over_total = row['bookmakers'][0]['markets'][2]['outcomes'][1]['point']
                        over_price = row['bookmakers'][0]['markets'][2]['outcomes'][1]['price']
                        
                        
                        under_total = row['bookmakers'][0]['markets'][2]['outcomes'][0]['point']
                        under_price = row['bookmakers'][0]['markets'][2]['outcomes'][0]['price']




                away_ml_list.append(away_ml)
                home_ml_list.append(home_ml)
                away_spread_list.append(away_spread)
                away_spread_price_list.append(away_spread_price)
                home_spread_list.append(home_spread)
                home_spread_price_list.append(home_spread_price)
                over_total_list.append(over_total)
                over_price_list.append(over_price)
                under_total_list.append(under_total)
                under_price_list.append(under_price)
                # Spread
                
                
                
                
                
            except:
                error_rows.append(index)

                continue
        # Drop rows without enough info
        df_api.drop(error_rows, inplace=True)
        df_api = df_api.reset_index(drop=True)

        df_api['Away Odds Close'] = pd.Series(away_ml_list)
        df_api['Home Odds Close'] = pd.Series(home_ml_list)

        df_api['Away Line Close'] = pd.Series(away_spread_list)
        df_api['Away Line Odds Close'] = pd.Series(away_spread_price_list)

        df_api['Home Line Close'] = pd.Series(home_spread_list)
        df_api['Home Line Odds Close'] = pd.Series(home_spread_price_list)

        # Total score
        df_api['Total Score Close'] = pd.Series(over_total_list)

        df_api['Total Score Over Close'] = pd.Series(over_price_list)
        df_api['Total Score Under Close'] = pd.Series(under_price_list)


        # Make sure data valid
        df_api = df_api.dropna()
        

        # Define the mapping from the old column names to the new column names
        column_mapping = {
            'commence_time': 'Date',
            'home_team': 'Home Team',
            'away_team': 'Away Team'
        }

        # Use the rename method to rename the columns
        df_api.rename(columns=column_mapping, inplace=True)

        # Remove the 'sport_key', 'sport_title', and 'bookmakers' columns
        df_api = df_api.drop(['sport_key', 'sport_title', 'bookmakers'], axis=1)

        

        X_new = self.getTargets(df_api)

        # Get df with predictions
        self.df_new = self.getPredictedValues(df_api)
        

        ids_list = list(self.df_new['id'])

        # Get best bets
        best_bets = self.df_new['Best Bet']

        # Make sure self.j has correct data to match any NaNs

        self.json_list = [x for x in self.j if x['id'] in ids_list]

        for index, game in enumerate(self.json_list):
            game['best_bet'] = best_bets[index]

        return self.json_list



    def getPredictedValues(self, df):

        # Predict scores using the trained model
        df['Predicted Home Score'] = self.model.predict(self.getTargets(df))[:, 0]
        df['Predicted Away Score'] = self.model.predict(self.getTargets(df))[:, 1]

        # New columns with prediction differences
        df['Predicted Total'] = df['Predicted Home Score'] + df['Predicted Away Score']
        df['Predicted Home Line'] = df['Predicted Away Score'] - df['Predicted Home Score']
        df['Predicted Away Line'] = df['Predicted Home Score'] - df['Predicted Away Score']

        # Percents
        df['Predicted Home Line Difference'] = (df['Home Line Close'] - df['Predicted Home Line'])
        df['Predicted Away Line Difference'] = (df['Away Line Close'] - df['Predicted Away Line'])
        df['Predicted Total Value Difference'] = -(df['Total Score Close'] - df['Predicted Total'])

        # Bestbet
        df['Best Bet'] = df.apply(self.bestbet, axis=1)
        return df

    
    def bestbet(self, row):
    #Pick over or under
        if abs(row['Predicted Total Value Difference']) > abs(row['Predicted Away Line Difference']):
            if row['Predicted Total Value Difference'] < 0:
                return {'Under': round(abs(row['Predicted Total Value Difference']), 2)}
            else:
                return {'Over': round(abs(row['Predicted Total Value Difference']), 2)}
        else:
            if row['Predicted Home Line Difference'] > 0:
                return {'Home Line': round(row['Predicted Home Line Difference'], 2)}
            else:
                return {'Away Line': round(row['Predicted Away Line Difference'], 2)}


    def makePretty(self, j):
        json_string = json.dumps(j)
        # Get markets and home/away teams
        home_team = j['home_team']
        away_team = j['away_team']
        markets = j['bookmakers'][0]['markets']

        # ML 'h2h' market
        if markets[0]['key'] == 'h2h':
            if markets[0]['outcomes'][0]['name'] == home_team:
                home_ml = j['bookmakers'][0]['markets'][0]['outcomes'][0]['price']
                away_ml = j['bookmakers'][0]['markets'][0]['outcomes'][1]['price']
            else:
                home_ml = j['bookmakers'][0]['markets'][0]['outcomes'][1]['price']
                away_ml = j['bookmakers'][0]['markets'][0]['outcomes'][0]['price']

        if markets[1]['key'] == 'spreads':
            if markets[1]['outcomes'][0]['name'] == home_team:

                away_spread = j['bookmakers'][0]['markets'][1]['outcomes'][1]['point']
                away_spread_price = j['bookmakers'][0]['markets'][1]['outcomes'][1]['price']
                
                
                home_spread = j['bookmakers'][0]['markets'][1]['outcomes'][0]['point']
                home_spread_price = j['bookmakers'][0]['markets'][1]['outcomes'][0]['price']
            else:
                away_spread = j['bookmakers'][0]['markets'][1]['outcomes'][0]['point']
                away_spread_price = j['bookmakers'][0]['markets'][1]['outcomes'][0]['price']
                
                
                home_spread = j['bookmakers'][0]['markets'][1]['outcomes'][1]['point']
                home_spread_price = j['bookmakers'][0]['markets'][1]['outcomes'][1]['price']

        if markets[2]['key'] == 'totals':
            if markets[2]['outcomes'][0]['name'] == 'Over':
                over_total = j['bookmakers'][0]['markets'][2]['outcomes'][0]['point']
                over_price = j['bookmakers'][0]['markets'][2]['outcomes'][0]['price']
                
                
                under_total = j['bookmakers'][0]['markets'][2]['outcomes'][1]['point']
                under_price = j['bookmakers'][0]['markets'][2]['outcomes'][1]['price']
            else:
                over_total = j['bookmakers'][0]['markets'][2]['outcomes'][1]['point']
                over_price = j['bookmakers'][0]['markets'][2]['outcomes'][1]['price']
                
                
                under_total = j['bookmakers'][0]['markets'][2]['outcomes'][0]['point']
                under_price = j['bookmakers'][0]['markets'][2]['outcomes'][0]['price']

        best = j['best_bet']
        best_bet_type = list(best.keys())[0]
        best_bet_edge = list(best.values())[0]

        date = datetime.strptime(j['commence_time'], "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=pytz.UTC)
        # Convert to Eastern Standard Time (EST)
        est_timezone = pytz.timezone('US/Eastern')
        est_datetime = date.astimezone(est_timezone)

        # Format the datetime in 12-hour format
        est_datetime_12hr_format = est_datetime.strftime('%Y-%m-%d %I:%M:%S %p')

        game = GameModel(j['id'], est_datetime_12hr_format, 'nfl', j['away_team'], j['home_team'], away_ml, home_ml, away_spread, away_spread_price, home_spread, home_spread_price, over_total, over_price, under_price, best_bet_type, best_bet_edge)

        return game.getGame()
    
    def makeAllPretty(self):
        self.all_pretty = [self.makePretty(x) for x in self.json_list]
        return self.all_pretty
    
    def populateDB(self):
        connection = connect('games')
        for element in self.makeAllPretty():
            if len(list(connection.find({'game_id': element["game_id"]}))) <= 0:
                connection.insert_one(element)
            else:
                print(element)
                connection.update_one({'game_id': element["game_id"]}, {'$set': element})