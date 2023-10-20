class GameModel():


    def __init__(self, game_id, date, sport, away_team, home_team, away_ml, home_ml, away_spread, away_spread_odds, home_spread, home_spread_odds, total, over_odds, under_odds, best_bet_type, best_bet_edge):
        self.game_id, self.date, self.sport, self.away_team, self.home_team, self.away_ml, self.home_ml, self.away_spread, self.away_spread_odds, self.home_spread, self.home_spread_odds, self.total, self.over_odds, self.under_odds, self.best_bet_type, self.best_bet_edge = game_id, date, sport, away_team, home_team, away_ml, home_ml, away_spread, away_spread_odds, home_spread, home_spread_odds, total, over_odds, under_odds, best_bet_type, best_bet_edge
        self.data_dict = self.getGame()
        

    
    def getGame(self):
        data_dict = {
            "game_id": self.game_id,
            "date": self.date,
            "sport": self.sport,
            "away_team": self.away_team,
            "home_team": self.home_team,
            "away_ml": self.away_ml,
            "home_ml": self.home_ml,
            "away_spread": self.away_spread,
            "away_spread_odds": self.away_spread_odds,
            "home_spread": self.home_spread,
            "home_spread_odds": self.home_spread_odds,
            "total": self.total,
            "over_odds": self.over_odds,
            "under_odds": self.under_odds,
            "best_bet_type": self.best_bet_type,
            "best_bet_edge": self.best_bet_edge
        }
        return data_dict


