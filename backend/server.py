# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify, render_template, redirect, url_for
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from models.GameModel import GameModel
from routes.showNFL import nfl_blueprint
from routes.signUp import signup_blueprint
from routes.login import login_blueprint
from db import connect
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

import datetime
 
load_dotenv()

# Initializing flask app
app = Flask(__name__)

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

# Mock user data (in practice, this comes from a database)
class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id

# User loader function to retrieve a user based on their ID
@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

# Login route
@app.route('/login')
def login():
    user = User(1)  # In practice, you would validate user credentials here
    login_user(user)
    return redirect(url_for('dashboard'))

# Dashboard route protected by @login_required
@app.route('/dashboard')
@login_required
def dashboard():
    return f'Welcome, {current_user.id}!'

# Logout route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return 'Logged out'


# Settings route, need to be logged in
@app.route("/settings")
@login_required
def settings():
    pass



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
        user_db = connect('users')
        user_db.insert_one(data)
        print("hello")
        return jsonify({
            'message': 'Game created successfully.'
        }, 201)

    except Exception as e:
        return jsonify({'error': str(e)}, 500)
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)