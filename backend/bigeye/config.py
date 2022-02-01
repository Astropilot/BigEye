import os
from distutils.util import strtobool

basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'postgresql://postgres@bigeyedb:5432/bigeye'
SQLALCHEMY_TRACK_MODIFICATIONS = False

MAIL_SERVER = os.environ.get('MAIL_SERVER')
MAIL_PORT = int(os.environ.get('MAIL_PORT', 0))
MAIL_USE_TLS = bool(strtobool(os.environ.get('MAIL_USE_TLS', 'False')))
MAIL_USE_SSL = bool(strtobool(os.environ.get('MAIL_USE_SSL', 'False')))
MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
MAIL_DEFAULT_SENDER = ('BigEye Support', os.environ.get('MAIL_USERNAME'))
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')

JWT_SECRET_KEY = 'dqz17&-!84f$z'

UPLOAD_FOLDER = os.path.join(basedir, 'static', 'challenges')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'zip'}

MAX_CONTENT_LENGTH = 3 * 1000 * 1000 # 3 Mb
