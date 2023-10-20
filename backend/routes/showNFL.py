from flask import Flask, Blueprint, request, jsonify
from models.GameModel import GameModel
from algos.NFLModel import NFLModel


nfl_blueprint = Blueprint('nfl_blueprint', __name__)

@nfl_blueprint.route('/nfl', methods=['GET'])
def get_games():
    nfl = NFLModel()
    data_json = nfl.all_pretty

    try:
        # game = Game(away_team, home_team, over, under, best_bet=None)
        # game.save()
        return data_json, 201

    except Exception as e:
        return jsonify({'error': str(e)}, 500)

