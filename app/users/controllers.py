import time

from flask import Blueprint, render_template
from flask import current_app
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlalchemy.orm import joinedload

from app import db
from .models import User, Address

mod = Blueprint('users', __name__, url_prefix='/users')


@event.listens_for(Engine, "before_cursor_execute")
def before_cursor_execute(conn, cursor, statement,
                          parameters, context, executemany):
    if not current_app.config['TESTING']:
        print(statement, parameters)
    conn.info.setdefault('query_start_time', []).append(time.time())


@event.listens_for(Engine, "after_cursor_execute")
def after_cursor_execute(conn, cursor, statement,
                         parameters, context, executemany):
    total = time.time() - conn.info['query_start_time'].pop(-1)
    if not current_app.config['TESTING']:
        print(total)


@mod.route('/', methods=['GET'])
def index():
    users = User.query.options(joinedload('addresses')).all()
    return render_template('users/users.html', users=users)


@mod.route('/<user_id>', methods=['GET'])
def show(user_id):
    print(user_id)
    user = User.query.get(user_id)
    # print(user.addresses.first().address)
    return render_template('users/user.html', user=user)


@mod.route('/testdb')
def testdb():
    if db.session.query("1").from_statement("SELECT 1").all():
        return 'It workds.'
    else:
        return 'something is broken.'
