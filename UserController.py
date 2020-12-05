import json
from flask import request
from flask import abort
from Jsons import USER_JSON
from UserService import UserService

USER_ID_KEY = "userId"
USERNAME_KEY = "username"
HASHED_PASSWORD = "userHashedPassword"
API_KEY = "apiKey"


class UserController:
    def __init__(self):
        self._user_service = UserService()

    def create_user(self):
        """
        Creating new User
        :return: the new user json, or 404 if user exist
        """
        user_json = request.json

        user_id = self._user_service.add_user(user_json[USERNAME_KEY], user_json[HASHED_PASSWORD])
        if user_id == "":
            abort(404)

        user_json[USER_ID_KEY] = user_id
        user_json[API_KEY] = 1

        return user_json

    def get_user_data(self, user_id):
        """
        Return the wanted user by id
        :param user_id: the wanted user id
        :return: the user json or 404 if user not found
        """
        user = self._user_service.get_user(user_id)
        if user is None:
            abort(404)

        user_json = json.loads(USER_JSON)
        user_json[USER_ID_KEY] = str(user.id)
        user_json[USERNAME_KEY] = user[USERNAME_KEY]
        user_json[API_KEY] = 1

        return user_json

    def login(self):
        """
        Login the user to the server
        :return: user json with id and API key
        """
        user_json = request.json
        username = user_json[USERNAME_KEY]
        password = user_json[HASHED_PASSWORD]

        user = self._user_service.get_user_by_name(username)
        if user is None:
            return abort(404)

        if user[HASHED_PASSWORD] != password:
            abort(404)

        user_json[USER_ID_KEY] = str(user.id)
        user_json[API_KEY] = 1

        return user_json

    def delete_user(self, user_id):
        """
        Delete user from the db by id
        :param user_id: the user id to delete
        :return: empty string or 404 on failure
        """
        user = self._user_service.get_user_by_id(user_id)
        if user is None:
            abort(404)

        user.delete()

        return ""
