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

# Set the time zone to EST
est_timezone = pytz.timezone('US/Eastern')



user_bets_blueprint = Blueprint('user_bets_blueprint', __name__)

@user_bets_blueprint.route('/', methods=['GET', 'POST'])
@jwt_required()
def get_bets():
    # For 'POST' Method, creation of a user bet
    if request.method == 'POST':
        # Create variables for bet initialization
        account_username = get_jwt_identity()
        game_id = request.json.get('game_id')
        bet_type = request.json.get('bet_type')
        wager = request.json.get('wager')
        potential_payout = request.json.get('potential_payout')
        timestamp = request.json.get('timestamp')

        error = None
        # Return bad request response that form is not completely filled out
        if not (account_username and game_id and bet_type and wager and potential_payout and timestamp):
            error = 'Bet is not completely filled out'
            return bad_response(error)

        if error is None:
            print("Its a post")
            print('Good to go')
            bet = UserBet(account_username, game_id, bet_type, wager, potential_payout, timestamp)
            try:
                connection = connect('bets')
                # Insert new bet and return created success response
                connection.insert_one(bet.data_dict)

                # Add to account bets array
                connection_to_users = connect('users')
                account = list(connection_to_users.find({'username': account_username}))[0]
                print(account)
                print(account['bets'])
                bets_list = account['bets']
                bets_list.append(bet.data_dict)
                print(bets_list)
                print(bet.data_dict)

                # Update user to include new bet 
                connection_to_users.update_one({'username': account_username}, {'$set': {'bets': bets_list}, '$currentDate': { 'lastUpdated': True }} )
                

                return good_creation_response("Successfully created bet!")


            except Exception as e:
                return bad_response(e)


    # For 'GET' Method, show list of user bets
    else:
        try:
            connection_to_bets = connect('bets')
            connection_to_users = connect('users')
            connection_to_games = connect('games')

            account_username = get_jwt_identity()

            account = list(connection_to_users.find({'username': account_username}))


            account_bets = account[0]['bets']
            print(account_bets)

            all_bets_ready_for_post = []

            for element in account_bets:
                the_bet = list(connection_to_bets.find({'_id': element['_id']}))[0]
                print(the_bet)
                the_game_id = the_bet['game_id']
                the_game = list(connection_to_games.find({'game_id': the_game_id}))[0]
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

                pp = odds * the_bet['wager']
                all_bets_ready_for_post.append({"away_team" : away_team, "home_team" : home_team, "type": bet_type, "odds": odds, "points": points, "wager": the_bet['wager'], "potential_payout": pp, "actual_payout": the_bet['actual_payout']})


            return good_response(all_bets_ready_for_post)

        except Exception as e:
                return bad_response(e)



    