
class User:
    def __init__(self, user_id: int, username: str, password: str):
        self.id = user_id
        self.username = username
        self.password = password
        self.apiKey = 1

    def __str__(self):
        return f"UserId:{self.id}, " \
               f"Username:{self.username}, " \
               f"HashedPassword:{self.password}, " \
               f"ApiKey:{self.apiKey}"
