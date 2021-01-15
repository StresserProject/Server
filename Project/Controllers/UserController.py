import json
from flask import request
from flask import abort
from Constants.Jsons import USER_JSON
from Constants.JsonKeys import UserKeys
from Services.UserService import UserService
from UserTokens import create_token, token_required


class UserController:
    def __init__(self):
        self._user_service = UserService()

    def create_user(self):
        """
        Creating new User
        :return: the new user json, or 404 if user exist
        """
        user_json = request.json

        user_id = self._user_service.add_user(user_json[UserKeys.USERNAME_KEY],
                                              user_json[UserKeys.HASHED_PASSWORD])
        if user_id == "":
            abort(404)

        user_json[USER_ID_KEY] = user_id
        user_json[API_KEY] = create_token(str(user_id))

        return user_json

    @token_required
    def get_user_data(self, user_id):
        """
        Return the wanted user by id
        :param user_id: the wanted user id
        :return: the user json or 404 if user not found
        """
        user = self._user_service.get_user_by_id(user_id)
        if user is None:
            abort(404)

        user_json = json.loads(USER_JSON)
        user_json[UserKeys.USER_ID_KEY] = str(user.id)
        user_json[UserKeys.USERNAME_KEY] = user[UserKeys.USERNAME_KEY]
        user_json[UserKeys.API_KEY] = 1

        return user_json

    def login(self):
        """
        Login the user to the server
        :return: user json with id and API key
        """
        user_json = request.json
        username = user_json[UserKeys.USERNAME_KEY]
        password = user_json[UserKeys.HASHED_PASSWORD]

        user = self._user_service.get_user_by_name(username)
        if user is None:
            return abort(404)

        if user[UserKeys.HASHED_PASSWORD] != password:
            abort(404)

        user_json[USER_ID_KEY] = str(user.id)
        user_json[API_KEY] = create_token(str(user.id))

        return user_json

    @token_required
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
