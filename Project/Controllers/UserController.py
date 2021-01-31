import json
from flask import request, make_response
from flask import abort
from Constants.Jsons import USER_JSON
from Constants.JsonKeys import UserKeys
import Services.UserService as UserService
from UserTokens import create_token, token_required, validate_cookie


def create_user():
    """
    Creating new User
    :return: the new user json, or 404 if user exist
    """
    user_json = request.json

    try:
        if UserService.is_username_unique(user_json[UserKeys.USERNAME_KEY]):
            UserService.add_user(user_json[UserKeys.USERNAME_KEY], user_json[UserKeys.HASHED_PASSWORD])
        else:
            return "Username already taken"
    except KeyError:
        abort(400)

    return ""


@token_required
def get_user_data(user_id):
    """
    Return the wanted user by id
    :param user_id: the wanted user id
    :return: the user json or 404 if user not found
    """
    user = UserService.get_user_by_id(user_id)
    if user is None:
        abort(404)

    user_json = json.loads(USER_JSON)
    user_json[UserKeys.USER_ID_KEY] = str(user.id)
    user_json[UserKeys.USERNAME_KEY] = user[UserKeys.USERNAME_KEY]

    return user_json


def login():
    """
    Login the user to the server
    :return: user json with id and API key
    """
    user_json = request.json
    username = user_json[UserKeys.USERNAME_KEY]
    password = user_json[UserKeys.HASHED_PASSWORD]

    user = UserService.get_user_by_name(username)
    if user is None:
        return abort(404)

    if user[UserKeys.HASHED_PASSWORD] != password:
        abort(404)

    token, refresh_token = create_token(str(user.id))

    user_json[UserKeys.USER_ID_KEY] = str(user.id)
    user_json[UserKeys.API_KEY] = token

    UserService.set_refresh_cookie(str(user.id), refresh_token)

    res = make_response(token)
    res.set_cookie("refresh_token", refresh_token, httponly=True)

    return res


@token_required
def delete_user(user_id):
    """
    Delete user from the db by id
    :param user_id: the user id to delete
    :return: empty string or 404 on failure
    """
    user = UserService.get_user_by_id(user_id)
    if user is None:
        abort(404)

    user.delete()

    return ""


def update_refresh_token():
    """
    Updates refresh token for user
    :return: token and new refresh_token
    """
    response = validate_cookie()
    if type(response) is not str:  # The response should be string if succeeded
        return response

    token, refresh_token = create_token(response)
    res = make_response(token)
    res.set_cookie("refresh_token", refresh_token, httponly=True)

    return res
