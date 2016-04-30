from flask import render_template, Blueprint
from app import app, db

forc = Blueprint('forc', __name__, url_prefix='/forc')


@app.route('/', methods=['GET'])
def home():
    return render_template('forc/home.html')


@app.route('/testdb')
def testdb():
    if db.session.query("1").from_statement("SELECT 1").all():
        return 'It workds.'
    else:
        return 'something is broken.'
