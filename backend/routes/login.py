from flask import Blueprint, request, jsonify
from models.Account import Account
import bcrypt
from db import connect


login_blueprint = Blueprint('login_blueprint', __name__)

@login_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

    # data = request.json
    # username = data.get('username')
    # password = data.get('password')

    try:
        user_db = connect('users')
        # error = None

        # if not username:
        #     error = 'Username is required.'
        # elif not password:
        #     error = 'Password is required.'

        # connection.insert_one(data_json)
        # return data

        return {"login":"no"}

    except Exception as e:
        return jsonify({'error': str(e)}, 500)

