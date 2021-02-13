import jwt
from functools import wraps
from flask import request, jsonify
import Services.UserService as UserService
import Services.EndpointService as EndpointService
from datetime import datetime, timedelta

JWT_SECRET = "SECRET_PASSWORD"
REFRESH_COOKIE = "SECRET_COOKIE"
TOKEN_EXPIRE_TIME = 5


def create_endpoint_token(endpoint_id: str):
    token = jwt.encode({
        "id": endpoint_id,
        "exp": datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_TIME)
    }, JWT_SECRET)

    return token.decode()


def create_user_token(user_id: str):
    token = jwt.encode({
        "id": user_id,
        "exp": datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_TIME)
    }, JWT_SECRET)

    refresh_cookie = jwt.encode({
        "id": user_id,
        "exp": datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_TIME)
    }, REFRESH_COOKIE)

    UserService.set_refresh_cookie(user_id, refresh_cookie.decode())

    return token.decode(), refresh_cookie.decode()


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        data = jwt.decode(token, JWT_SECRET)
        if UserService.get_user_by_id(data["id"]) is not None or\
                EndpointService.get_endpoint_by_id(data[id]) is not None:
            return f(*args, **kwargs)

        return jsonify({
            'message': 'Token is invalid !!'
        }), 401

    return decorated


def validate_cookie():
    cookie = request.cookies.get('refresh_token')
    if not cookie:
        return jsonify({'message': 'Cookie is missing !!'}), 401

    data = jwt.decode(cookie, REFRESH_COOKIE)
    user = UserService.get_user_by_id(data["id"])
    if user is None:
        return jsonify({
            'message': 'Cookie is invalid !!'
        }), 401

    if user.refresh == cookie:
        return data["id"]

    return jsonify({
        'message': 'Cookie is invalid !!'
    }), 401



