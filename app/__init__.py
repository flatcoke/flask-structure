import os
from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.script import Manager

app = Flask(__name__)

app.config.from_object(os.environ.get("FLATCOKE"))
db = SQLAlchemy(app)
manager = Manager(app)


# HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('error/404.html'), 404


@app.errorhandler(500)
def internal_server_error(error):
    return render_template('error/500.html'), 500


# Import a module / component using its blueprint handler variable (mod_auth)
from app.mod_auth.controllers import mod_auth as auth_module
from app.forc.controllers import forc as forc_module


# Register blueprint(s)
# app.register_blueprint(xyz_module)
app.register_blueprint(auth_module)
app.register_blueprint(forc_module)
# ..

# Build the database:
# This will create the database file using SQLAlchemy
db.create_all()
