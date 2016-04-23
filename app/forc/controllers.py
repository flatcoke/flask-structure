from flask import render_template, Blueprint


forc = Blueprint('forc', __name__, url_prefix='/forc')


@forc.route('/home/', methods=['GET'])
def test():
    return render_template('forc/home.html')


