import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)
    SQLALCHEMY_DATABASE_URI = 'postgresql://musee_4_user:7s1WNyTX2JhBt0urjkm1N4LZweYa3bah@dpg-cq7hr7lds78s73d7hhtg-a.ohio-postgres.render.com/musee_4'
    SQLALCHEMY_ECHO = True
