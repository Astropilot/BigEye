from passlib.apps import custom_app_context as pwd_context
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import func, select
from enum import Enum

from .base import db
from .challenge import Challenge

class UserRoles(Enum):
    CLASSIC = 1
    ADMIN = 2

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(320), index=True, unique=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    role = db.Column(db.Enum(UserRoles), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    email_verified = db.Column(db.Boolean(), default=False)
    email_token = db.Column(db.String(128), nullable=False)
    token = None

    @hybrid_property
    def total_points(self):
        points = Challenge.query.with_entities(func.sum(Challenge.points)).first()[0]

        if points is None:
            return 0
        return points

    @hybrid_property
    def total_points_solved(self):
        return sum(chall.points for chall in self.challenges_resolved)

    def hash_password(self, password):
        self.password = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password)
