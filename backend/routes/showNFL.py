from flask import Flask, Blueprint, request, jsonify
from models.GameModel import GameModel
from algos.NFLModel import NFLModel
from db import connect
from datetime import datetime
import pytz
import json

# Set the time zone to EST
est_tz = pytz.timezone('US/Eastern')



nfl_blueprint = Blueprint('nfl_blueprint', __name__)

@nfl_blueprint.route('/', methods=['GET'])
def get_games():
    connection = connect('games')
    # Get the current time in EST
    current_time_est = datetime.now(est_tz)
    formatted_time = str(current_time_est.strftime("%Y-%m-%d %I:%M:%S %p"))
    print(formatted_time)   
    data = list(connection.find({'date': {"$gt": formatted_time}}))
    for element in data:
        element['_id'] = str(element['_id'])
    print(data)
    # nfl = NFLModel()
    # data_json = nfl.all_pretty
    #nfl.populateDB()
    print(type(json.dumps(data)))

    try:
        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)}, 500)

