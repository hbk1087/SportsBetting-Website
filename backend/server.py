# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify, render_template, redirect, url_for, send_from_directory
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from routes.showNFL import nfl_blueprint
from routes.signUp import signup_blueprint
from routes.login import login_blueprint
from routes.userBets import user_bets_blueprint
from db import connect
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from bson.objectid import ObjectId
import json
from datetime import datetime, timedelta, timezone
import bcrypt
from routes.responses import good_response, bad_response

 
load_dotenv()

# Initializing flask app
app = Flask(__name__, static_folder="static")

# Session management
secret_key = os.getenv('SECRET_KEY')
app.config["JWT_SECRET_KEY"] = secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response



@app.route('/token', methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    #password_check = bcrypt.checkpw(password.encode('utf-8'), duplicate_username[0]['password'])

    connection = connect('users')
    # Check if user exists
    duplicate_username = list(connection.find({'username': username}))

    ### Implement to check db for correct db with bcrypt and that username matches
    try:
        if len(duplicate_username) > 0:
            if duplicate_username[0]['username'] != username or bcrypt.checkpw(password.encode('utf-8'), duplicate_username[0]['password'].encode('utf-8')) == False:
                return {"msg": "Wrong email or password"}, 401
            # Create token
            access_token = create_access_token(identity=username)
            response = {"access_token":access_token}
            return good_response(response)
        else:
            return bad_response('No such User found!')
        
    except Exception as e:
        return bad_response(e)

@app.route('/account')
@jwt_required()
def my_account():

    current_account = get_jwt_identity()
    connection = connect('users')

    try:
        account = list(connection.find({'username': current_account}))
        # Make sure object id is string
        for element in account:
            element['_id'] = str(element['_id'])
            
        # Return account details
        return good_response(account)
    
    except Exception as e:
        return bad_response(e)


# Update Users
@app.route('/account_updates', methods=["POST"])
def update_user():

    username = request.json.get("username")

    data = {
    "username": username,
    "password": request.json.get("password"),
    "first_name": request.json.get("first_name"),
    "last_name": request.json.get("last_name"),
    "email": request.json.get("email"),
    "phone_number": request.json.get("phone_number"),
    "address": request.json.get("address"),
    "bets": request.json.get("bets"),
    "lifetime_winnings": request.json.get("lifetime_winnings"),
    "current_balance": request.json.get("current_balance")
    }

    try:
        connection = connect('users')
        connection.update_one({'username': username}, {'$set': data, '$currentDate': { 'lastUpdated': True }} )
        return good_response(f"User {username} was updated")
    except Exception as e:
        return bad_response(e)




@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return good_response(response)


@app.route('/')
def index():
    return app.send_static_file('sb.html')


@app.route('/static/<path:filename>')
def serve_static(filename):
    return app.send_from_directory('static', filename)



# variables
x = datetime.now()

# Route for main page to see all nfl games
app.register_blueprint(nfl_blueprint, url_prefix='/nfl')

# Route for signup page to see all nfl games
app.register_blueprint(signup_blueprint, url_prefix='/signup')

# Route for signup page to see all nfl games
app.register_blueprint(login_blueprint, url_prefix='/login')

# Route to see user bets and insert new ones
app.register_blueprint(user_bets_blueprint, url_prefix='/bets')

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