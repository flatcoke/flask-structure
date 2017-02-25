from flask import render_template, Blueprint, redirect, url_for
from app.mod_auth.models import User
from app import db

mod = Blueprint('forc', __name__, url_prefix='/forc')


@mod.route('/', methods=['GET'])
def index():
    return render_template('forc/home.html')


@mod.route('/testdb')
def testdb():
    if db.session.query("1").from_statement("SELECT 1").all():
        return 'It workds.'
    else:
        return 'something is broken.'
