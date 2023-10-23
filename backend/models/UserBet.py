class UserBet():

    def __init__(self, account_id, game_id, bet_type, wager, potential_payout, timestamp, actual_payout=None):
        self.account_id = account_id # Account object here
        self.game_id = game_id #GameModel object will go here
        self.bet_type = bet_type
        self.wager = wager
        self.potential_payout = potential_payout
        self.timestamp = timestamp
        self.actual_payout = actual_payout
        self.data_dict = self.getBet()

    def getBet(self):
        data_dict = {
            "account_id": self.account_id,
            "game_id": self.game_id,
            "bet_type": self.bet_type,
            "wager": self.wager,
            "potental_payout": self.potential_payout,
            "timestamp": self.timestamp, 
            "actual_payout": self.actual_payout
        }
        return data_dict

        