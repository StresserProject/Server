import jwt
from functools import wraps
from flask import request, jsonify
from Services.UserService import UserDB
from datetime import datetime, timedelta


SECRET = "SECRET_PASSWORD"
TOKEN_EXPIRE_TIME = 5


def create_token(user_id: str):
    token = jwt.encode({
        "id": user_id,
        "exp": datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_TIME)
    }, SECRET)

    return token.decode()


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'api-key' in request.headers:
            token = request.headers['access-token']
        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        try:
            data = jwt.decode(token, SECRET)
            current_user = UserDB.objects(id=data['id'])
            if not current_user:
                raise
        except:
            return jsonify({
                'message': 'Token is invalid !!'
            }), 401

        return f(*args, **kwargs)

    return decorated
