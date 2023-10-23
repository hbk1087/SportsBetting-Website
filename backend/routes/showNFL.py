from flask import Flask, Blueprint, request, jsonify, Response, make_response
from models.GameModel import GameModel
from algos.NFLModel import NFLModel
from db import connect
from datetime import datetime
import pytz
from routes.responses import good_response, bad_response
import json


# Set the time zone to EST
est_tz = pytz.timezone('US/Eastern')



nfl_blueprint = Blueprint('nfl_blueprint', __name__)

@nfl_blueprint.route('/', methods=['GET'])
def get_games():
    # Connect to db
    connection = connect('games')
    # Get the current time in EST
    current_time_est = datetime.now(est_tz)
    formatted_time = str(current_time_est.strftime("%Y-%m-%d %I:%M:%S %p"))
    print(formatted_time)   
    data = list(connection.find({"$and": [{'date': {"$gt": formatted_time}}, {"sport": {'$eq': "nfl"}}]}))
    for element in data:
        element['_id'] = str(element['_id'])

    try:
        return good_response(data)

    except Exception as e:
        return bad_response(e)

