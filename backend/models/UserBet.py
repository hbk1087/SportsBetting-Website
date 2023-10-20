from GameModel import GameModel
from Account import Account

class UserBet():

    def __init__(self, account_id, gameModel, bet_type, wager, payout):
        self.account_id = account_id # Account object here
        self.gameModel = gameModel #GameModel object will go here
        self.bet_type = bet_type
        self.wager = wager
        self.payout = payout
        self.data_dict = self.getBet()

    def getBet(self):
        data_dict = {
            "account": self.account,
            "game": self.gameModel,
            "bet_type": self.bet_type,
            "wager": self.wager,
            "payout": self.payout
        }
        return data_dict
        