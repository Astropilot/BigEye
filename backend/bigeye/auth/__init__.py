from flask import jsonify
from flask_jwt_extended import (
    JWTManager
)

from ..models.user import User

jwt = JWTManager()

@jwt.user_lookup_loader
def user_lookup_callback(_, jwt_data):
    identity = jwt_data["sub"]
    return User.query.get(identity)

@jwt.user_lookup_error_loader
def custom_user_loader_error(jwt_header, jwt_payload):
    ret = {
        'message': 'Incorrect token'
    }
    return jsonify(ret), 401

def init_app(app):
    jwt.init_app(app)
