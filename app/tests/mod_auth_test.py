#!flask/bin/python
import os
import unittest

from config import BASE_DIR
from app import app, db
from app.mod_auth.models import User


class TestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR, 'test.db')
        self.client = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_sign_up(self):
        id = 'flatcoke'
        name = 'taeminkim'
        email = 'flatcoke89@gmail.com'
        password = 'qwer1234'

        rv = self.client.post('/auth/signup/',
                              data=dict(username=id,
                                        name=name,
                                        password=password,
                                        email=email, ),
                              follow_redirects=True)
        assert rv.status_code == 200

        print User.query.all()

if __name__ == '__main__':
    unittest.main()