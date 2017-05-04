# -*- coding:utf-8 -*-
# Run a test server.
import os
import unittest

from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.script import Manager
from werkzeug.serving import run_simple
from werkzeug.wsgi import DispatcherMiddleware

from app import create_app, db

if os.path.exists('.env'):
    print('Importing environment from .env file')
    for line in open('.env'):
        var = line.strip().split('=')
        if len(var) == 2:
            os.environ[var[0]] = var[1]


if os.environ.get('FLATCOKE') == 'production':
    app = DispatcherMiddleware(create_app(os.environ.get("FLATCOKE")), {
        '/api': create_app('api')
    })
else:
    app = create_app(os.environ.get("FLATCOKE") or 'development')


manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)


@manager.command
def hello():
    """say hello for testing"""
    print('hello')


@manager.command
def recreate_db():
    """
    Recreates a local database. You probably should not use this on
    production.
    """
    db.drop_all()
    db.create_all()
    db.session.commit()


@manager.command
def test():
    """Run unit tests."""
    tests = unittest.TestLoader().discover('app.tests', pattern='*.py')
    unittest.TextTestRunner(verbosity=1).run(tests)


@manager.command
def dev():
    # TODO add TestingConfig
    pass


if __name__ == '__main__':
    if os.environ.get('FLATCOKE') == 'production':
        run_simple('0.0.0.0', 5000, app,
                   use_reloader=False, use_debugger=False,
                   )
    manager.run()
