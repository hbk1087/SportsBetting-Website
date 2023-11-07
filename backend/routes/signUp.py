from flask import Flask, Blueprint, request, jsonify, redirect, url_for, Response
from models.Account import Account
import bcrypt
from db import connect
from routes.responses import good_creation_response, bad_response, good_response
from flask_cors import CORS, cross_origin


signup_blueprint = Blueprint('signup_blueprint', __name__)

@signup_blueprint.route('', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin()
def signup():

    if request.method == 'POST':

        # Create variables for account initialization
        username = request.json.get('username')
        first_name = request.json.get('first_name')
        last_name = request.json.get('last_name')
        email = request.json.get('email')
        phone_number = request.json.get('phone_number')
        address = request.json.get('address')
        password = request.json.get('password')



        error = None
        # Return bad request response that form is not completely filled out
        if not (username and first_name and last_name and email and phone_number and address and password):
            error = 'Signup form is not completely filled out'
            return bad_response(error)
            
        if error is None:
            print("Its a post")
            print('Good to go')
            account = Account(username, first_name, last_name, email, phone_number, address, password)
            try:
                connection = connect('users')

                # Check for duplicate
                duplicate_username = list(connection.find({'username': username}))
                duplicate_email = list(connection.find({'email': email}))

                # return error if duplicate
                if len(duplicate_username) > 0 or len(duplicate_email) > 0:
                    error = 'Username or email is already registered'
                    return bad_response(error)

                # Correct login
                else:
                    # Insert new user and return created success response
                    connection.insert_one(account.data_dict)
                    return good_creation_response({})


            except Exception as e:
                return bad_response(e)
            
    # On 'GET' Method, what to return
    return good_response('On Signup Page!') # Re-render back to home or some static page


    

