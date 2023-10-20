from flask import Flask, Blueprint, request, jsonify, redirect, url_for
from models.Account import Account
import bcrypt
from db import connect

# Initializing flask app
app = Flask(__name__)

signup_blueprint = Blueprint('signup_blueprint', __name__)

@signup_blueprint.route('/signup', methods=['GET', 'POST'])
def signup():

    if request.method == 'POST':
        
        username = request.json.get('username')
        first_name = request.json.get('first_name')
        last_name = request.json.get('last_name')
        email = request.json.get('email')
        phone_number = request.json.get('phone_number')
        address = request.json.get('address')
        password = request.json.get('password')
        error = None
        
        if not (username and first_name and last_name and email and phone_number and address and password):
            error = 'Form is not completely filled out'
            
        if error is None:
            print("Its a post")
            print('Good to go')
            account = Account(username, first_name, last_name, email, phone_number, address, password)
            try:
                connection = connect('users')

                # Check for duplicate
                duplicate_username = list(connection.find({'username': username}))
                duplicate_email = list(connection.find({'email': email}))
                #print(duplicate_email)
                #print(duplicate_username)
                if len(duplicate_username) > 0 or len(duplicate_email) > 0:
                    error = 'Username or email is already registered'
                    print(error)

                else:
                    connection.insert_one(account.data_dict)
                    print(account.data_dict)
                    return redirect(url_for('login_blueprint.login'))

                return account.data_dict, 201

            except Exception as e:
                return jsonify({'error': str(e)}, 500)
    
    return app.send_static_file('index.html') # Re-render back to home or some static page


    

