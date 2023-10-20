# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from models.GameModel import GameModel
from routes.showNFL import nfl_blueprint
from routes.signUp import signup_blueprint
from routes.login import login_blueprint
from db import connect

import datetime
 
load_dotenv()

# Initializing flask app
app = Flask(__name__)


# variables
x = datetime.datetime.now()

# Route for main page to see all nfl games
app.register_blueprint(nfl_blueprint, url_prefix='/nfl')

# Route for signup page to see all nfl games
app.register_blueprint(signup_blueprint, url_prefix='/')

# Route for signup page to see all nfl games
app.register_blueprint(login_blueprint, url_prefix='/')

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
    timestamp = data.get('timestamp')
    

    try:
        #game = Game(away_team, home_team, over, under, best_bet, timestamp)
        connection = connect('users')
        connection.insert_one(data)
        print("hello")
        return jsonify({
            'message': 'Game created successfully.'
        }, 201)

    except Exception as e:
        return jsonify({'error': str(e)}, 500)
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)