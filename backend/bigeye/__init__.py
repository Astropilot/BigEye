from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_migrate import Migrate
from flask_mail import Mail

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    CORS(app)

    from . import models
    models.init_app(app)

    from . import auth
    auth.init_app(app)

    from bigeye.models import db
    Migrate(app, db)

    app.mail = Mail(app)

    from .errors import errors

    from .api import api_bp
    api = Api(api_bp, catch_all_404s=True, errors=errors)

    from .resources.user import UserResource, UserListResource, UserConfirmResource, UserLeaderboardResource, UserByNameResource
    from .resources.challenge import ChallengeCategoryListResource, ChallengeListResource, ChallengeResolveResource, ChallengeResource


    api.add_resource(UserListResource, '/users')
    api.add_resource(UserLeaderboardResource, '/users/leaderboard')
    api.add_resource(UserConfirmResource, '/users/confirm')
    api.add_resource(UserResource, '/users/<user_id>')
    api.add_resource(UserByNameResource, '/users/name/<username>')

    api.add_resource(ChallengeCategoryListResource, '/challenges/categories')
    api.add_resource(ChallengeListResource, '/categories/<category_id>/challenges')
    api.add_resource(ChallengeResolveResource, '/challenges/<challenge_id>/resolve')
    api.add_resource(ChallengeResource, '/challenges/<challenge_id>')

    app.register_blueprint(api_bp, url_prefix='/api')

    try:
        return app
    except:
        pass
