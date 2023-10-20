# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from pymongo import MongoClient
from models.GameModel import Game

import os
from dotenv import load_dotenv

import datetime
 
load_dotenv()

# Initializing flask app
app = Flask(__name__)
mongo_uri = os.getenv('MONGO_URI')


try:
    # Connect to MongoDB
    client = MongoClient(mongo_uri)
    db = client.games_db
    #collection = db['data']


except Exception as e:
    # Todo: implement better exception handling
    print(f"Could not connect to MongoDB - please check authentication details and try again.\nError details: {e}")

# variables
x = datetime.datetime.now()

# Route for main page
@app.route('/')
def index():
    return {
        'mssg' : "u made it in"
    }

# Route for seeing a data
@app.route('/data')
def get_time():
 
    # Returning an api for showing in  reactjs
    return {
        'Name':"sport model", 
        "Age":"2023",
        "Date":x, 
        "programming":"python"
        }
 
@app.route('/create_game', methods=['POST'])
def create_game():
    data = request.json
    print(data)
    away_team = data.get('away_team')
    home_team = data.get('home_team')
    over = data.get('over')
    under = data.get('under')
    best_bet = data.get('best_bet')

    try:
        game = Game(away_team, home_team, over, under, best_bet)
        client.db.games_db.insert_one(game.__dict__)
        print("hello")
        return jsonify({
            'message': 'Game created successfully.'
        }, 201)

    except Exception as e:
        return jsonify({'error': str(e)}, 500)
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)