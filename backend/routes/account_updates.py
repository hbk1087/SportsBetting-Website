from db import connect
from flask import Flask, Blueprint, request, jsonify, Response
from routes.responses import good_response, bad_response
from flask_cors import CORS, cross_origin




# Update Users
account_updates_blueprint = Blueprint('account_updates_blueprint', __name__)

@account_updates_blueprint.route('/', methods=['POST'])
@cross_origin()
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
