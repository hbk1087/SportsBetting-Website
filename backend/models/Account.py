import bcrypt


class Account():

    def __init__(self, username, first_name, last_name, email, phone_number, address, password):
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone_number = phone_number
        self.address = address
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.unhashed_password = password
        self.data_dict = self.getAccount()
        self.bets = []
        self.lifetime_winnings = 0
        self.current_balance = 0

    def getAccount(self):
        data_dict = {
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone_number": self.phone_number,
            "address": self.address,
            "password": str(self.password.decode())
        }

        return data_dict