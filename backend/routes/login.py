from flask import Flask, Blueprint, request, jsonify, Response
from models.Account import Account
import bcrypt
from db import connect
#from flask_login import LoginManager
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager

login_blueprint = Blueprint('login_blueprint', __name__)

@login_blueprint.route('/', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

    # data = request.json
    # username = data.get('username')
    # password = data.get('password')
    # login_manager = LoginManager()

    #login_blueprint = Blueprint('login_blueprint', __name__)
    # login_manager.init_app(app)


    try:
        connection = connect('users')
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



