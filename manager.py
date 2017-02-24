# Run a test server.
import unittest

from app import manager, app


@manager.command
def hello():
    """say hello for testing"""
    print 'hello'


@manager.command
def test():
    """Run unit tests."""
    app.config.from_object('config.TestingConfig')
    tests = unittest.TestLoader().discover('app.tests', pattern='*.py')
    unittest.TextTestRunner(verbosity=1).run(tests)


@manager.command
def dev():
    # TODO add TestingConfig
    pass


if __name__ == '__main__':
    manager.run()