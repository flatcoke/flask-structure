from flask import render_template, Blueprint, redirect, url_for
from app import db, app

mod = Blueprint('forc', __name__, url_prefix='/forc')


@app.route('/', methods=['GET'])
def home():
    return redirect(url_for('forc.index'))


@mod.route('/', methods=['GET'])
def index():
    return render_template('forc/home.html')


@mod.route('testdb')
def testdb():
    if db.session.query("1").from_statement("SELECT 1").all():
        return 'It workds.'
    else:
        return 'something is broken.'
