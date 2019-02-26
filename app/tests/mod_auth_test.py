# -*-coding:utf-8-*-
import unittest

from app import create_app, db
from app.users.models import User


class TestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.client = self.app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_user_get_function(self):
        test_list = [
            dict(username='flatcoke', password='qwer1235',
                 email='flatcoke89@gmail.com', name='TaeminKim', ),
            dict(username='c121213', password='12341234',
                 email='c121213@naver.com', name='Kevin', ),
            dict(username='gogogohaha', password='asdfasdf',
                 email='flatcoke@naver.com', name='TaeMin', ),
            dict(username='taemin-kim', password='googoo',
                 email='taeminkim98@gmail.com', name='Noah', ),
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
        url = '/auth/signup'

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
                 email='flatcoke@naver.com', name='TaeMin', ),
            dict(username='taemin-kim', password='gogogo', confirm='gogogo',
                 email='taeminkim98@gmail.com', name='TM', ),
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
        for item in test_list:
            rv = self.post_signup(item)
            self.assertEqual(rv.status_code, 406)
        self.assertIs(len(User.query.all()), len(test_list))

        # User db clear
        User.query.delete()

        # password does not match with confirm
        for item in test_list:
            item['confirm'] += 'test'
            rv = self.post_signup(item)
            self.assertEqual(rv.status_code, 406)

        # not exists confirm
        for item in test_list:
            item.pop('confirm', None)
            rv = self.post_signup(item)
            self.assertEqual(rv.status_code, 406)

    def test_sign_in(self):
        url = '/auth/signin'
        test_list = [
            dict(username='flatcoke', password='qwer1235', confirm='qwer1235',
                 email='flatcoke89@gmail.com', name='TaeminKim', ),
            dict(username='c121213', password='12341234', confirm='12341234',
                 email='c121213@naver.com', name='Kevin', ),
            dict(username='gogogohaha', password='asdfasdf', confirm='asdfasdf',
                 email='flatcoke@naver.com', name='TaeMin', ),
            dict(username='taemin-kim', password='gogogo', confirm='gogogo',
                 email='taeminkim98@gmail.com', name='Lee', ),
        ]
        # sing up before test
        for item in test_list:
            self.post_signup(item)

        # success (detail)
        for index, item in enumerate(test_list):
            rv = self.client.post(url,
                                  data=item,
                                  follow_redirects=True)
            self.assertEqual(rv.status_code, 200)

            # session 값, check success message
            with self.client.session_transaction() as session:
                self.assertEqual(session['username'], item['username'])
                flash = dict(session.pop('_flashes'))
                self.assertEqual(flash['message'],
                                 'Welcome %s' % item['username'])
                # TODO ('key': 'value') check session

            user = User.query.filter_by(username=item['username']).first()
            self.assertEqual(user.username, item['username'])
            self.assertEqual(user.name, item['name'])
            del item['name']
            del item['username']
            del item['confirm']

        # success (simple)
        for item in test_list:
            rv = self.client.post(url,
                                  data=item,
                                  follow_redirects=True)
            self.assertEqual(rv.status_code, 200)

            with self.client.session_transaction() as session:
                self.assertEqual(session['email'], item['email'])
                del session['_flashes']

        failure_list = test_list
        for item in failure_list:
            item['password'] += 'haha'
            rv = self.client.post(url,
                                  data=item,
                                  follow_redirects=True)
            self.assertEqual(rv.status_code, 200)

            with self.client.session_transaction() as session:
                self.assertEqual(session['_flashes'][0][1],
                                 'Wrong email or password')
                del session['_flashes']

        failure_list = test_list
        for item in failure_list:
            item['email'] += 'haha'
            rv = self.client.post(url,
                                  data=item,
                                  follow_redirects=True)
            self.assertEqual(rv.status_code, 200)

            with self.client.session_transaction() as session:
                self.assertEqual(session['_flashes'][0][1],
                                 'Wrong email or password')
                del session['_flashes']


if __name__ == '__main__':
    unittest.main()
