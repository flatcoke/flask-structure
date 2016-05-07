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
        app.config['SQLALCHEMY_DATABASE_URI'] = \
            'sqlite:///' + os.path.join(BASE_DIR, 'test.db')
        self.client = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def signup(self, data):
        url = '/auth/signup/'

        return self.client.post(url,
                                data=data,
                                follow_redirects=True)


    def test_sign_up(self):
        form = dict(username='flatcoke',
                    name='taeminkim',
                    email='flatcoke89@gmail.com',
                    password='qwer1234',
                    confirm='qwer1234',
                    )

        # nomal case
        rv = self.signup(form)
        self.assertEqual(rv.status_code, 200)
        self.assertIsNotNone(User.query.filter_by(
                                username=form['username'],
                                name=form['name'],
                                email=form['email'], ).first())
        self.assertIs(len(User.query.all()), 1)

        # already exists
        rv = self.signup(form)

        self.assertIs(len(User.query.all()), 1)
        self.assertIn('That username is already taken', rv.data)

        # password is not match with confirm
        form.pop('confirm')
        rv = self.signup(form)
        self.assertIn('Passwords must match', rv.data)


if __name__ == '__main__':
    unittest.main()