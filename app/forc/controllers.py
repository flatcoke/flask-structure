import time

from flask import Blueprint, redirect, render_template, url_for
from flask_login import login_required
from sqlalchemy import event
from sqlalchemy.engine import Engine

from app import db
from app.auth.models import User, Address

mod = Blueprint('forc', __name__, url_prefix='/forc')


@event.listens_for(Engine, "before_cursor_execute")
def before_cursor_execute(conn, cursor, statement,
                          parameters, context, executemany):
    print(statement, parameters)
    conn.info.setdefault('query_start_time', []).append(time.time())


@event.listens_for(Engine, "after_cursor_execute")
def after_cursor_execute(conn, cursor, statement,
                         parameters, context, executemany):
    total = time.time() - conn.info['query_start_time'].pop(-1)
    print(total)


@mod.route('/', methods=['GET'])
def index():
    user = User.query.get(1)
    print('------------------')
    print(user.address)

    return render_template('forc/home.html')


@mod.route('/testdb')
def testdb():
    if db.session.query("1").from_statement("SELECT 1").all():
        return 'It workds.'
    else:
        return 'something is broken.'
