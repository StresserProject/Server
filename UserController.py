import json
from flask import request
from flask import abort
from Jsons import USER_JSON
from User import User

USER_ID_KEY = "userId"
USERNAME_KEY = "username"
HASHED_PASSWORD = "userHashedPassword"
API_KEY = "apiKey"


class UserController:
    def __init__(self):
        self._users = dict()

        self._id = 0  # Delete This later!

    def create_user(self):
        # Return JSON!
        user_json = request.json

        new_user = User(self._id, user_json[USERNAME_KEY], user_json[HASHED_PASSWORD])
        self._id += 1

        self._users[new_user.user_id] = new_user

        return str(new_user)

    def get_user_data(self, user_id):
        try:
            user = self._users[user_id]
        except KeyError:
            abort(404)

        user_json = json.loads(USER_JSON)
        user_json[USER_ID_KEY] = user.user_id
        user_json[USERNAME_KEY] = user.username
        user_json[API_KEY] = user.api_key

        return user_json

    def login(self):
        user_json = request.json
        username = user_json[USERNAME_KEY]
        password = user_json[HASHED_PASSWORD]

        for user in self._users.values():
            if username == user.username:
                if password == user.user_hashed_password:
                    return str(user)

        abort(404)

    def delete_user(self, user_id):
        try:
            self._users.pop(user_id)
        except KeyError:
            abort(404)

        return ""
