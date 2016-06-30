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

    def test_user_get_function(self):
        test_list = [
            dict(username='flatcoke', password='qwer1235',
                 email='flatcoke89@gmail.com', name='TaeminKim', ),
            dict(username='c121213', password='12341234',
                 email='c121213@naver.com', name='Kevin', ),
            dict(username='gogogohaha', password='asdfasdf',
                 email='flatcoke@naver.com', name='Min', ),
            dict(username='taemin-kim', password='googoo',
                 email='taeminkim98@gmail.com', name='Le', ),
            dict(username='11good', password='1',
                 email='c121213@nate.com', name='flatcoke', ),
        ]
        for i in test_list:
            user = User(i['username'], i['name'], i['email'], i['password'])
            db.session.add(user)
            db.session.commit()

            result = User.get(user.id)
            self.assertIsInstance(result, User)
            self.assertEqual(result.username, i['username'])
            self.assertEqual(result.name, i['name'])
            self.assertNotEqual(result.password, i['password'])

    def post_signup(self, data):
        url = '/auth/signup/'

        return self.client.post(url,
                                data=data,
                                follow_redirects=True)

    def test_sign_up(self):
        test_list = [
            dict(username='flatcoke', password='qwer1235', confirm='qwer1235',
                 email='flatcoke89@gmail.com', name='TaeminKim', ),
            dict(username='c121213', password='12341234', confirm='12341234',
                 email='c121213@naver.com', name='Kevin', ),
            dict(username='gogogohaha', password='asdfasdf', confirm='asdfasdf',
                 email='flatcoke@naver.com', name='Min', ),
            dict(username='taemin-kim', password='gogogo', confirm='gogogo',
                 email='taeminkim98@gmail.com', name='Le', ),
        ]

        # normal case
        for index, item in enumerate(test_list):
            rv = self.post_signup(item)
            self.assertEqual(rv.status_code, 200)
            self.assertIsNotNone(User.query.filter_by(
                username=item['username'],
                name=item['name'],
                email=item['email'], ).first())
            self.assertIs(len(User.query.all()), index + 1)

        # already exists
        for i in test_list:
            rv = self.post_signup(i)
            self.assertEqual(rv.status_code, 406)
            self.assertIn("That username is already taken", rv.data)
        self.assertIs(len(User.query.all()), len(test_list))

        # User db clear
        User.query.delete()

        # password does not match with confirm
        for i in test_list:
            i['confirm'] += 'test'
            rv = self.post_signup(i)
            self.assertEqual(rv.status_code, 406)
            self.assertIn("Passwords must match", rv.data)

        # not exists confirm
        for i in test_list:
            i.pop('confirm', None)
            rv = self.post_signup(i)
            self.assertEqual(rv.status_code, 406)
            self.assertIn("Repeat Password", rv.data)

    def test_sign_in(self):
        return
        url = '/auth/signin/'
        form = dict(username='flatcoke',
                    password='qwer1234',
                    confirm='qwer1234',
                    name='TaeminKim',
                    email='flatcoke89@gmail.com')
        self.post_signup(form)

        rv = self.client.post(url,
                         data=form,
                         follow_redirects=True)
        self.assertEqual(rv.status_code, 200)

        self.assertEqual(self.client.session['username'], 'flatcoke')
        user = self.User.query.filter_by(username=form['username']).first()
        self.assertEqual(self.client.session['user_id'], user.id)


if __name__ == '__main__':
    unittest.main()
