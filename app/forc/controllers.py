from flask import render_template, Blueprint
from app import app

forc = Blueprint('forc', __name__, url_prefix='/forc')


@app.route('/', methods=['GET'])
def home():
    return render_template('forc/home.html')
