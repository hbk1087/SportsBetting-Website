class UserBet():

    def __init__(self, account_username, game_id, bet_type, odds, points, wager, potential_payout, timestamp, actual_payout=None):
        self.account_username = account_username 
        self.game_id = game_id 
        self.bet_type = bet_type
        self.odds = odds
        self.points = points
        self.wager = wager
        self.potential_payout = potential_payout
        self.timestamp = timestamp
        self.actual_payout = actual_payout
        self.data_dict = self.getBet()

    def getBet(self):
        data_dict = {
            "account_username": self.account_username,
            "game_id": self.game_id,
            "bet_type": self.bet_type,
            "odds": self.odds,
            "points": self.points,
            "wager": self.wager,
            "potential_payout": self.potential_payout,
            "timestamp": self.timestamp, 
            "actual_payout": self.actual_payout
        }
        return data_dict

        