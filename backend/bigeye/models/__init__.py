import click
from flask import current_app, g
from flask.cli import with_appcontext

from .base import db, ma
from .user import User
from .challenge import ChallengeCategory, Challenge, ChallengeResolve

def init_db():
    db.create_all()
    db.session.commit()

@click.command('init-db')
@with_appcontext
def init_db_command():
    init_db()
    click.echo('Initialized the database.')

def init_app(app):
    db.init_app(app)
    ma.init_app(app)
    app.cli.add_command(init_db_command)
