import jwt
from functools import wraps
from flask import request, jsonify
import Services.UserService as UserService
from datetime import datetime, timedelta

JWT_SECRET = "SECRET_PASSWORD"
REFRESH_COOKIE = "SECRET_COOKIE"
TOKEN_EXPIRE_TIME = 5


def create_token(user_id: str):
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
        if 'api-key' in request.headers:
            token = request.headers['access-token']
        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        data = jwt.decode(token, JWT_SECRET)
        if UserService.get_user_by_id(data["id"]) is None:
            return jsonify({
                'message': 'Token is invalid !!'
            }), 401

        return f(*args, **kwargs)

    return decorated
