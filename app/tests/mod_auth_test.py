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

    def test_sign_up(self):
        url = '/auth/signup/'

        form = dict(username='flatcoke',
                    name='taeminkim',
                    email='flatcoke89@gmail.com',
                    password='qwer1234',
                    confirm='qwer1234',
                    )

        # nomal case
        rv = self.client.post(url,
                              data=form,
                              follow_redirects=True)
        assert rv.status_code == 200
        assert User.query.filter_by(username=form['username'],
                                    name=form['name'],
                                    email=form['email'], ).first()
        assert len(User.query.all()) == 1

        # already exists
        rv = self.client.post('/auth/signup/',
                              data=form,
                              follow_redirects=True)

        assert len(User.query.all()) == 1
        assert rv.data.find('That username is already taken') != -1

        # password is not match with confirm
        form.pop('confirm')
        rv = self.client.post('/auth/signup/',
                              data=form,
                              follow_redirects=True)
        assert rv.data.find('Passwords must match') != -1


if __name__ == '__main__':
    unittest.main()