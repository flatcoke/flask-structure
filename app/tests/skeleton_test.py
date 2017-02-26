# -*-coding:utf-8-*-
import unittest

from app import create_app, db


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
    
    def test_skeleton(self):
        return True


if __name__ == '__main__':
    unittest.main()
