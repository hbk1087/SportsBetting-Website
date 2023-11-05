# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify, render_template, redirect, url_for, send_from_directory
from pymongo import MongoClient, DESCENDING, ASCENDING
from flask_cors import CORS, cross_origin
import os
from dotenv import load_dotenv
from routes.showNFL import nfl_blueprint
from routes.signUp import signup_blueprint
from routes.userBets import user_bets_blueprint
from db import connect
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from bson.objectid import ObjectId
import json
from datetime import datetime, timedelta, timezone
import bcrypt
from routes.responses import good_response, bad_response
import pytz

 
load_dotenv()

# Initializing flask app
app = Flask(__name__, static_folder="static")



### Login Session/Authentication management
secret_key = os.getenv('SECRET_KEY')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["JWT_SECRET_KEY"] = secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

@app.after_request
@cross_origin()
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
    
# Get token to validate user and session
@app.route('/api/token', methods=["POST", 'OPTIONS'])
@cross_origin()
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

@app.route('/account', methods=['GET', 'PATCH', 'OPTIONS'])
@jwt_required()
@cross_origin()
def my_account():

    if request.method == 'GET':

        current_account = get_jwt_identity()
        print(current_account)
        connection = connect('users')

        try:
            account = list(connection.find({'username': current_account}))
            # Make sure object id is string
            for element in account:
                element['_id'] = str(element['_id'])
                
            # Return account details
            print(account[0])
            return good_response(account[0])
        
        except Exception as e:
            return bad_response(e)
    # Change account info
    elif request.method == 'PATCH':
        username = request.args['username']
        data = request.json

        try:
            connection = connect('users')
            connection.update_one({'username': username}, {'$set': data, '$currentDate': { 'lastUpdated': True }} )
            return good_response(f"User {username} was updated")
        except Exception as e:
            return bad_response(e)
    else:
        pass



@app.route("/api/logout", methods=["POST", 'OPTIONS'])
@cross_origin()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response




@app.route('/api/home')
@cross_origin()
def index():

    connection = connect('games')
    # Set the time zone to EST
    est_tz = pytz.timezone('US/Eastern')
    current_time_est = datetime.now(est_tz)
    formatted_time = str(current_time_est.strftime("%Y-%m-%d %I:%M:%S %p"))

    # print games in future  
    games = list(connection.find())
    data = []
    for element in games:
        element['_id'] = str(element['_id'])
        if datetime.strptime(element['date'], "%Y-%m-%d %I:%M:%S %p") > datetime.strptime(formatted_time, "%Y-%m-%d %I:%M:%S %p"):
            data.append(element)


    try:
        return good_response(data)

    except Exception as e:
        return bad_response(e)
    


@app.route('/api/static/<path:filename>')
@cross_origin()
def serve_static(filename):
    return app.send_from_directory('static', filename)



# Blueprint to see all nfl games
app.register_blueprint(nfl_blueprint, url_prefix='/api/nfl')

# Blueprint for signup page
app.register_blueprint(signup_blueprint, url_prefix='/api/signup')

# Blueprint to see user bets and insert new ones
app.register_blueprint(user_bets_blueprint, url_prefix='/api/bets')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

     
# Running app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)