from flask import Flask, Blueprint, request, jsonify, Response
from models.UserBet import UserBet
from models.GameModel import GameModel
from models.Account import Account
from algos.NFLModel import NFLModel
from db import connect
from datetime import datetime
import pytz
from routes.responses import good_creation_response, bad_response, good_response

# Set the time zone to EST
est_timezone = pytz.timezone('US/Eastern')



user_bets_blueprint = Blueprint('user_bets_blueprint', __name__)

@user_bets_blueprint.route('/', methods=['GET', 'POST'])
def get_bets():
    # For 'POST' Method, creation of a user bet
    if request.method == 'POST':
        # Create variables for bet initialization
        account_id = request.json.get('account_id')
        game_id = request.json.get('game_id')
        bet_type = request.json.get('bet_type')
        wager = request.json.get('wager')
        potential_payout = request.json.get('potential_payout')
        timestamp = request.json.get('timestamp')

        error = None
        # Return bad request response that form is not completely filled out
        if not (account_id and game_id and bet_type and wager and potential_payout and timestamp):
            error = 'Bet is not completely filled out'
            return bad_response(error)

        if error is None:
            print("Its a post")
            print('Good to go')
            bet = UserBet(account_id, game_id, bet_type, wager, potential_payout, timestamp)
            try:
                connection = connect('bets')
                # Insert new user and return created success response
                connection.insert_one(bet.data_dict)
                return good_creation_response("Successfully created bet!")


            except Exception as e:
                return bad_response(e)


    # For 'GET' Method, show list of user bets
    else:
        return good_response('On Bets Page!')





    # bet_type = "Away Spread"
    # game = GameModel()
    # account  = Account()
    # # Get the current time in EST
    # timestamp = datetime.now(est_timezone)
    # bet = UserBet(account, game, bet_type, 100, 200, timestamp)
    
    
    # # Just to show what it is
    # data =  {
    #     "user_id": bet.user_id,
    #     "game": bet.gameModel,
    #     "bet_type": bet.bet_type,
    #     "wager": bet.wager,
    #     "potential_payout": bet.potential_payout
    # }   

    # try:
    #     connection = connect('bets')
    #     connection.insert_one(data)
    #     return data

    # except Exception as e:
    #     return jsonify({'error': str(e)}, 500)