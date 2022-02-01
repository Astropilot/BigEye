from marshmallow import fields, validate
from marshmallow_enum import EnumField

from bigeye.models.base import ma
from bigeye.models.user import UserRoles
from bigeye.models.challenge import ChallengeDifficulty


class ChallengeCategorySchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True, validate=validate.Regexp('^[a-zA-Z0-9_]{3,40}$'))
    total_challenges = fields.Integer(dump_only=True)
    total_challenges_resolved = fields.Integer(dump_only=True)


class ChallengeSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    description = fields.String(required=False, missing=None)
    difficulty = EnumField(ChallengeDifficulty, required=True)
    flag = fields.String(load_only=True, required=True)
    category = fields.Nested(ChallengeCategorySchema, dump_only=True)
    points = fields.Integer(required=True)
    created_at = fields.DateTime(dump_only=True)
    resource_link = fields.String(dump_only=True)
    link = fields.String(load_only=True, required=False, validate=validate.URL(relative=False))
    hint = fields.String(required=False, missing=None)
    is_resolved = fields.Boolean(dump_only=True)


class ChallengeResolveSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    user = fields.Nested(lambda: UserSchema(only=('id', 'email', 'username', 'role')), dump_only=True)
    challenge = fields.Nested(ChallengeSchema, dump_only=True)
    points = fields.Integer(dump_only=True)
    resolved_at = fields.DateTime(dump_only=True)

class UserSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    email = fields.String(required=True, validate=validate.Email())
    username = fields.String(required=True, validate=validate.Regexp('^[a-zA-Z0-9_]{3,20}$'))
    role = EnumField(UserRoles, dump_only=True)
    password = fields.String(load_only=True, validate=validate.Regexp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$'))
    token = fields.String(dump_only=True)
    total_points = fields.Integer(dump_only=True)
    total_points_solved = fields.Integer(dump_only=True)
    challenges_resolved = fields.List(fields.Nested(ChallengeResolveSchema(exclude=('user',))), dump_only=True)


user_schema = UserSchema(only=('id', 'username', 'role', 'created_at'))
user_schema_own = UserSchema()
users_schema = UserSchema(many=True, only=('id', 'username', 'created_at', 'total_points_solved', 'challenges_resolved'))

challengecategory_schema = ChallengeCategorySchema(many=True)
challengecategorysingle_schema = ChallengeCategorySchema()

challenges_schema = ChallengeSchema(many=True, exclude=('category',))
challenge_schema = ChallengeSchema()

challengeresolve_schema = ChallengeResolveSchema()
