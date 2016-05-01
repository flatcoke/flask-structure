# Run a test server.
from app import app
from flask.ext.script import Manager

manager = Manager(app)


@manager.command
def hello():
    print 'hello'


if __name__ == '__main__':
    manager.run()
