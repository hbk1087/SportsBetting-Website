from flask import Flask, Blueprint, request, jsonify, Response
from models.UserBet import UserBet
from models.GameModel import GameModel
from models.Account import Account
from algos.NFLModel import NFLModel
from db import connect
from datetime import datetime
import pytz
from routes.responses import good_creation_response, bad_response, good_response
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from flask_cors import CORS, cross_origin

# Set the time zone to EST
est_timezone = pytz.timezone('US/Eastern')



user_bets_blueprint = Blueprint('user_bets_blueprint', __name__)

@user_bets_blueprint.route('', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin()
@jwt_required()
def get_bets():
    # For 'POST' Method, creation of a user bet
    if request.method == 'POST':
        # Create variables for bet initialization
        account_username = get_jwt_identity()
        game_id = request.json.get('game_id')
        bet_type = request.json.get('bet_type')
        odds = request.json.get('odds')
        points = request.json.get('points')
        wager = request.json.get('wager')
        potential_payout = request.json.get('potential_payout')
        timestamp = request.json.get('timestamp')

        error = None
        # Return bad request response that form is not completely filled out
        if not (account_username and game_id and bet_type and odds and points and wager and potential_payout and timestamp):
            error = 'Bet is not completely filled out'
            return bad_response(error)

        if error is None:
            bet = UserBet(account_username, game_id, bet_type, odds, points, wager, potential_payout, timestamp)
            try:
                connection = connect('bets')

                # Make sure account balance - wager is >= 0
                connection_to_users = connect('users')
                account = list(connection_to_users.find({'username': account_username}))[0]
                if float(account['current_balance']) - float(bet.wager) >= 0:

                    # Insert new bet and return created success response, update user account balance and lifetime winnings
                    connection.insert_one(bet.data_dict)

                    new_lifetime_winnings = float(account['lifetime_winnings']) - float(bet.wager)
                    new_current_balance = float(account['current_balance']) - float(bet.wager)
                    connection_to_users.update_one({'username': account_username}, {'$set': {"lifetime_winnings": new_lifetime_winnings}, '$currentDate': { 'lastUpdated': True }} )
                    connection_to_users.update_one({'username': account_username}, {'$set': {"current_balance": new_current_balance}, '$currentDate': { 'lastUpdated': True }} )
                    return good_creation_response("Successfully created bet!")
                else:
                    return bad_response("Insufficient funds for wager")
                


            except Exception as e:
                return bad_response(e)


    # For 'GET' Method, show list of user bets
    else:
        try:
            connection_to_bets = connect('bets')
            connection_to_users = connect('users')
            connection_to_games = connect('games')

            account_username = get_jwt_identity()

            account_bets = list(connection_to_bets.find({'account_username': account_username}))

            all_bets_ready_for_post = []

            for element in account_bets:
                the_bet = element

                the_game_id = the_bet['game_id']
                the_game = list(connection_to_games.find({'game_id': the_game_id}))[0]

                away_score = the_game['away_score']
                home_score = the_game['home_score']
                away_team = the_game['away_team']
                home_team = the_game['home_team']
                bet_type = the_bet['bet_type']
                odds = 0
                points = None


                if bet_type == 'Away':
                    odds = the_game['away_odds']
                elif bet_type == 'Home':
                    odds = the_game['home_odds']
                elif bet_type == 'Away Line':
                    odds = the_game['away_spread_odds']
                    points = the_game['away_spread']
                elif bet_type == 'Home Line':
                    odds = the_game['home_spread_odds']
                    points = the_game['home_spread']
                elif bet_type == 'Over':
                    odds = the_game['over_odds']
                    points = the_game['total']
                elif bet_type == 'Under':
                    odds = the_game['under_odds']
                    points = the_game['total']

                pp = the_bet['potential_payout']
                odds = the_bet['odds']
                if points == None:
                    points = 'Money Line'
                all_bets_ready_for_post.append({"sport": the_game['sport'], "away_team" : away_team, "home_team" : home_team, "away_score" : away_score, "home_score" : home_score, "bet_type": bet_type, "odds": odds, "points": the_bet['points'], "wager": the_bet['wager'], "potential_payout": pp, "actual_payout": the_bet['actual_payout'], "timestamp": the_bet['timestamp'], "game_date": the_game['date']})


            sorted_data_descending = sorted(all_bets_ready_for_post, key=lambda x: x['timestamp'], reverse=True)

            return good_response(sorted_data_descending)

        except Exception as e:
                return bad_response(e)



    