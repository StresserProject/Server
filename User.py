import uuid


class User:
    def __init__(self, user_id: int, username: str, user_hashed_password: str):
        self.user_id = user_id
        self.username = username
        self.user_hashed_password = user_hashed_password
        self.api_key = uuid.uuid1()

    def __str__(self):
        return f"UserId:{self.user_id}, " \
               f"Username:{self.username}, " \
               f"HashedPassword:{self.user_hashed_password}, " \
               f"ApiKey:{self.api_key}"
