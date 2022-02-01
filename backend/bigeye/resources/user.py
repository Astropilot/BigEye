from flask import request, jsonify, render_template, current_app
from flask_restful import Resource
from datetime import datetime, timedelta
from flask_jwt_extended import (
    jwt_required, create_access_token, current_user
)
import hashlib

from ..models.base import db
from ..models.user import User, UserRoles
from ..schemas.schemas import user_schema, user_schema_own, users_schema, UserSchema
from ..mails import send_mail_html

from ..api import api_bp

CONFIRM_MAIL_IMAGES = [
    {
        'path': 'templates/images/bigeye_logo.png',
        'mimetype': 'image/png',
        'content_id': 'bigeyelogo'
    },
    {
        'path': 'templates/images/facebook2x.png',
        'mimetype': 'image/png',
        'content_id': 'facebook'
    },
    {
        'path': 'templates/images/instagram2x.png',
        'mimetype': 'image/png',
        'content_id': 'instagram'
    },
    {
        'path': 'templates/images/linkedin2x.png',
        'mimetype': 'image/png',
        'content_id': 'linkedin'
    },{
        'path': 'templates/images/twitter2x.png',
        'mimetype': 'image/png',
        'content_id': 'twitter'
    },
    {
        'path': 'templates/images/bee.png',
        'mimetype': 'image/png',
        'content_id': 'background'
    }
]

@api_bp.route('/auth', methods=['POST'])
def auth():
    data = request.form
    if not data:
        return jsonify({'error': 'No content provided'}), 400

    username = data.get('username', None)
    password = data.get('password', None)

    if not username or not password:
        return jsonify({'error': 'username or password missing'}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'The user/password credentials does not match any user!'}), 404
    if not user.verify_password(password):
        return jsonify({'error': 'The user/password credentials does not match any user!'}), 404

    if not user.email_verified:
        return jsonify({'error': 'The user is not activated! Please confirm your email.'}), 404

    expires = timedelta(days=1)
    web_token = create_access_token(identity=user.id, expires_delta=expires)
    user.token = web_token
    user = user_schema_own.dump(user)
    return jsonify(user), 201


class UserListResource(Resource):
    def post(self):
        data = request.form
        if not data:
            return {'error': 'No content provided'}, 400

        errors = user_schema_own.validate(data)
        if len(errors) > 0:
            return {'error': errors}, 400

        data = user_schema_own.load(data)

        if User.query.filter((User.email==data['email']) | (User.username==data['username'])).first() is not None:
            return {'error': 'User already exist!'}, 400

        now = datetime.now()
        email_token_payload = data['email'] + "_" + str(datetime.timestamp(now))
        h = hashlib.new('sha256')
        h.update(email_token_payload.encode('utf-8'))
        email_token = h.hexdigest()

        user = User(
            email=data['email'],
            username=data['username'],
            role=UserRoles.CLASSIC,
            created_at=now,
            email_verified=False,
            email_token=email_token
        )
        user.hash_password(data['password'])
        db.session.add(user)
        db.session.commit()

        if current_app.config['ENV'] == 'development':
            confirm_link = f'http://localhost:4200/confirm/{email_token}'
        else:
            confirm_link = f'https://bigeye.codexus.fr/confirm/{email_token}'

        send_mail_html(
                'BigEye Registration - Confirm Email',
                [data['email']],
                render_template(
                    'confirm-email.html',
                    confirm_link=confirm_link
                ),
                CONFIRM_MAIL_IMAGES
            )

        user = user_schema_own.dump(user)
        return user, 201


class UserConfirmResource(Resource):
    def post(self):
        data = request.form
        if not data:
            return {'error': 'No content provided'}, 400

        email_token = data.get('token', None)

        if email_token is None:
            return {'error': 'No token was provided!'}

        user = User.query.filter_by(email_token=email_token, email_verified=False).first()

        if user is None:
            return {'error': 'No user found for this token!'}, 400

        if user.email_verified == True:
            return {'error': 'This user is already verified!'}, 400

        user.email_verified = True

        db.session.commit()

        user = user_schema_own.dump(user)
        return user, 201


class UserLeaderboardResource(Resource):

    @jwt_required()
    def get(self):

        users = User.query.filter(User.challenges_resolved.any())

        users = sorted(users, key=lambda user: user.total_points_solved, reverse=True)
        users = users[:50]

        users = users_schema.dump(users)

        return users, 200


class UserResource(Resource):

    @jwt_required()
    def get(self, user_id):
        user = User.query.get(user_id)
        if user:
            if str(current_user.id) == user_id:
                user = user_schema_own.dump(user)
            else:
                user = user_schema.dump(user)
            return user, 200
        else:
            return {'error': 'User not found'}, 404

    @jwt_required()
    def put(self, user_id):
        if str(current_user.id) != user_id:
            return {'error': 'Forbidden'}, 403

        data = request.form

        if not data:
            return {'error': 'No content provided'}, 400

        user = User.query.get(user_id)

        if not user:
            return {'error': 'User not found'}, 404

        errors = user_schema_own.validate(data)
        if len(errors) > 0:
            return {'error': errors}, 400

        user.email = data.get('email', user.email)
        db.session.commit()

        user = user_schema_own.dump(user)
        return user, 200


class UserByNameResource(Resource):

    @jwt_required()
    def get(self, username):
        user = User.query.filter_by(username=username).first()
        userprofile_schema = UserSchema(only=('id', 'username', 'created_at', 'total_points_solved', 'challenges_resolved'))

        if user:
            user = userprofile_schema.dump(user)
            return user, 200
        else:
            return {'error': 'User not found'}, 404
