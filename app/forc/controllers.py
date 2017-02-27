from flask import Blueprint, redirect, render_template, url_for
from flask_login import login_required

from app import db
from app.auth.models import User

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
