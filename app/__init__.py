import os

from config import config
from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    db.init_app(app)

    #  # HTTP error handling
    #  @app.errorhandler(404)
    #  def not_found(error):
    #      return render_template('error/404.html'), 404

    #  @app.errorhandler(500)
    #  def internal_server_error(error):
    #      return render_template('error/500.html'), 500

    # Import a module / component using its blueprint handler variable
    from app.mod_auth.controllers import mod as auth_module
    from app.forc.controllers import mod as forc_module

    # Register blueprint(s)
    # app.register_blueprint(xyz_module)
    app.register_blueprint(auth_module)
    app.register_blueprint(forc_module)

    return app
