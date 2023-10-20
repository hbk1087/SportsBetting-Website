# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from pymongo import MongoClient
from pymongo.errors import PyMongoError

import os
from dotenv import load_dotenv

import datetime
 
x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)

# MongoDB Atlas connection string
mongo_username = os.getenv('MONGO_USERNAME')
mongo_password = os.getenv('MONGO_PASSWORD')
mongo_uri = f"mongodb+srv://{mongo_username}:{mongo_password}@sportsbet.ah9rvyf.mongodb.net/?retryWrites=true&w=majority"

try:
    # Connect to MongoDB
    client = MongoClient(mongo_uri)

    # Access database
    db = client.sportsbet

except PyMongoError as e:
    print("Could not connect to MongoDB - please check authentication details and try again.")
 
# Route for main page
@app.route('/')
def connect():
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
 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)