from flask import Flask, Blueprint, request, jsonify
from models.UserBet import UserBet
from models.GameModel import GameModel
from algos.NFLModel import NFLModel
from db import connect


user_bets_blueprint = Blueprint('user_bets_blueprint', __name__)

@user_bets_blueprint.route('/bets', methods=['POST'])
def get_bets():
    response = request.json
    bet_type = "Away Spread"
    game = GameModel()
    bet = UserBet('1', game, bet_type, 100, 200)
    
    # Just to show what it is
    data =  {
        "user_id": bet.user_id,
        "game": bet.gameModel,
        "bet_type": bet.bet_type,
        "wager": bet.wager,
        "payout": bet.payout
    }   

    try:
        connection = connect('bets')
        connection.insert_one(data)
        return data

    except Exception as e:
        return jsonify({'error': str(e)}, 500)