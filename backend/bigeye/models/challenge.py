from enum import Enum
from sqlalchemy.ext.hybrid import hybrid_property

from .base import db


class ChallengeDifficulty(Enum):
    EASY = 1
    MEDIUM = 2
    HARD = 3
    EXTREME = 4


class ChallengeCategory(db.Model):
    __tablename__ = 'challengecategories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    total_challenges_resolved = None

    @hybrid_property
    def total_challenges(self):
        return Challenge.query.with_parent(self).count()


class Challenge(db.Model):
    __tablename__ = 'challenges'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300), nullable=True)
    difficulty = db.Column(db.Enum(ChallengeDifficulty), nullable=False)
    flag = db.Column(db.String(100), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('challengecategories.id'), nullable=False)
    category = db.relationship('ChallengeCategory', backref=db.backref('challenges', lazy=True))
    points = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    resource_link = db.Column(db.String(500), nullable=False)
    hint = db.Column(db.String(255), nullable=True)
    is_resolved = None


class ChallengeResolve(db.Model):
    __tablename__ = 'challengeresolves'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('challenges_resolved', lazy=True))
    challenge_id = db.Column(db.Integer, db.ForeignKey('challenges.id'), nullable=False)
    challenge = db.relationship('Challenge', backref=db.backref('resolved', lazy=True))
    points = db.Column(db.Integer, nullable=True)
    resolved_at = db.Column(db.DateTime(), nullable=False)
