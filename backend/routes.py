# from flask import Blueprint, request, jsonify

# # Import models
# from models import Game

# games_blueprint = Blueprint('games', __name__)

# @games_blueprint.route('/create_game', methods=['POST'])
# def create_game():
#     data = request.json
#     away_team = data.get('away_team')
#     home_team = data.get('home_team')
#     over = data.get('over')
#     under = data.get('under')
#     best_bet = data.get('best_bet')

#     try:
#         game = Game(away_team, home_team, over, under, best_bet=None)
#         game.save()
#         return jsonify({
#             'message': 'Game created successfully.'
#         }, 201)

#     except Exception as e:
#         return jsonify({'error': str(e)}, 500)

# from server import app
# app.register_blueprint(games_blueprint, url_prefix='/games')