from asyncio import FastChildWatcher
import os
from unicodedata import category
from flask import request, current_app, url_for
from flask_restful import Resource
from datetime import datetime
from flask_jwt_extended import (
    jwt_required, current_user
)
from werkzeug.utils import secure_filename
from sqlalchemy.orm import aliased

from bigeye.models.user import UserRoles

from ..models.base import db
from ..models.challenge import ChallengeCategory, Challenge, ChallengeResolve
from ..schemas.schemas import challengecategory_schema, challenge_schema, challengeresolve_schema, challenges_schema, challengecategorysingle_schema


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']


class ChallengeCategoryListResource(Resource):

    @jwt_required()
    def get(self):
        challenge_categories = ChallengeCategory.query.all()

        categories = []
        for category in challenge_categories:
            category.total_challenges_resolved = ChallengeResolve.query.filter(ChallengeResolve.user_id == current_user.id).\
                                                                        join(ChallengeResolve.challenge).\
                                                                        filter(Challenge.category_id == category.id).count()
            categories.append(category)

        challenge_categories_dump = challengecategory_schema.dump(categories)

        return challenge_categories_dump, 200


    @jwt_required()
    def post(self):
        if current_user.role != UserRoles.ADMIN:
            return {'error': 'You cannot create a category. Insufisant privilege.'}, 403

        dataForm = request.form
        if not dataForm:
            return {'error': 'No content provided'}, 400

        errors = challengecategorysingle_schema.validate(dataForm)
        if len(errors) > 0:
            return {'error': errors}, 400

        data = challengecategorysingle_schema.load(dataForm)

        category = ChallengeCategory(
            name=data['name']
        )
        db.session.add(category)
        db.session.commit()

        category = challengecategorysingle_schema.dump(category)
        return category, 201


class ChallengeListResource(Resource):

    @jwt_required()
    def get(self, category_id):
        category = ChallengeCategory.query.get(category_id)

        if not category:
            return {'error': 'Category not found'}, 404

        challenges = Challenge.query.filter_by(category=category).order_by(Challenge.difficulty.asc())

        challenge_list = []
        for challenge in challenges:
            challenge.is_resolved = ChallengeResolve.query.filter_by(user_id=current_user.id, challenge_id=challenge.id).count() > 0
            challenge_list.append(challenge)

        challenges_dump = challenges_schema.dump(challenge_list)

        return challenges_dump, 200


    @jwt_required()
    def post(self, category_id):
        if current_user.role != UserRoles.ADMIN:
            return {'error': 'You cannot create a challenge. Insufisant privilege.'}, 403

        dataForm = request.form
        if not dataForm:
            return {'error': 'No content provided'}, 400

        errors = challenge_schema.validate(dataForm)
        if len(errors) > 0:
            return {'error': errors}, 400

        if 'file' not in request.files and 'link' not in dataForm:
            return {'error': 'Please send a file or a link!'}, 400

        if 'file' in request.files and 'link' in dataForm:
            return {'error': 'Please send a file or a link, not both!'}, 400

        data = challenge_schema.load(dataForm)

        if 'file' in request.files:
            file = request.files['file']
            if file.filename == '':
                return {'error': 'No file has been sent!'}, 400

            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))

                if current_app.config['ENV'] == 'development':
                    resource_link = f'http://localhost:8000'
                else:
                    resource_link = f'https://api.ctf.codexus.fr'

                resource_link += url_for('static', filename='challenges/' + filename)

            else:
                return {'error': 'The file extension is not allowed! Allowed: ' + ','.join(current_app.config['ALLOWED_EXTENSIONS'])}, 400
        else:
            resource_link = data['link']

        category = ChallengeCategory.query.get(category_id)

        if category is None:
            return {'error': 'The given category is not found!'}, 404

        challenge = Challenge(
            title=data['title'],
            description=data['description'],
            difficulty=data['difficulty'],
            flag=data['flag'],
            category=category,
            points=data['points'],
            created_at=datetime.now(),
            resource_link=resource_link,
            hint=data['hint']
        )
        challenge.is_resolved = False
        db.session.add(challenge)
        db.session.commit()

        challenge = challenge_schema.dump(challenge)
        return challenge, 201

class ChallengeResource(Resource):

    @jwt_required()
    def get(self, challenge_id):
        challenge = Challenge.query.get(challenge_id)

        if not challenge:
            return {'error': 'Challenge not found'}, 404

        challenge.is_resolved = ChallengeResolve.query.filter_by(user_id=current_user.id, challenge_id=challenge.id).count() > 0

        challenge_dump = challenge_schema.dump(challenge)

        return challenge_dump, 200


class ChallengeResolveResource(Resource):

    @jwt_required()
    def post(self, challenge_id):
        challenge = Challenge.query.get(challenge_id)

        if not challenge:
            return {'error': 'Challenge not found'}, 404

        resolved = ChallengeResolve.query.filter_by(user_id=current_user.id, challenge_id=challenge.id).first()

        if resolved is not None:
            return {'error': 'You already solved this challenge!'}, 400

        data = request.form
        if not data:
            return {'error': 'No flag provided'}, 400

        flag = data.get('flag', None)

        if not flag:
            return {'error': 'No flag provided'}, 400

        if flag != challenge.flag:
            return {'error': 'Wrong flag! Don\'t get discouraged and persevere!'}, 400

        resolved = ChallengeResolve(
            user_id=current_user.id,
            challenge_id=challenge.id,
            points=challenge.points,
            resolved_at=datetime.now()
        )
        db.session.add(resolved)
        db.session.commit()

        resolved = challengeresolve_schema.dump(resolved)

        return resolved, 201
