from flask import Flask, Blueprint, request, jsonify
from models.UserBet import UserBet
from models.GameModel import GameModel
from models.Account import Account
from algos.NFLModel import NFLModel
from db import connect
from datetime import datetime
import pytz

# Set the time zone to EST
est_timezone = pytz.timezone('US/Eastern')



user_bets_blueprint = Blueprint('user_bets_blueprint', __name__)

@user_bets_blueprint.route('/bets', methods=['GET', 'POST'])
def get_bets():
    response = request.json
    bet_type = "Away Spread"
    game = GameModel()
    account  = Account()
    # Get the current time in EST
    timestamp = datetime.now(est_timezone)
    bet = UserBet(account, game, bet_type, 100, 200, timestamp)
    
    
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