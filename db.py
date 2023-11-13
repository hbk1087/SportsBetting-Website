# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from routes.responses import bad_db_connection

load_dotenv()
mongo_uri = os.getenv('MONGO_URI')

def connect(collection):
    
    if collection == 'users':
        return connectUsers()
    elif collection == 'games':
        return connectGames()
    elif collection == 'bets':
        return connectBets()


def connectUsers():
    try:
        # Connect to MongoDB
        client = MongoClient(mongo_uri)
        db = client.users #Whatever after . is collection name
        return client.db.users

    except Exception as e:
        # Todo: implement better exception handling
        return bad_db_connection(e)

def connectGames():
    try:
        # Connect to MongoDB
        client = MongoClient(mongo_uri)
        db = client.games #Whatever after . is collection name
        return client.db.games

    except Exception as e:
        # Todo: implement better exception handling
        return bad_db_connection(e)

def connectBets():
    try:
        # Connect to MongoDB
        client = MongoClient(mongo_uri)
        db = client.bets #Whatever after . is collection name
        return client.db.bets

    except Exception as e:
        # Todo: implement better exception handling
        return bad_db_connection(e)