# -*-coding:utf-8-*-
import unittest

from app import create_app, db


class TestCase(unittest.TestCase):
    def setUp(self):
        app = create_app('testing')
        self.client = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
    
    def test_skeleton(self):
        return True


if __name__ == '__main__':
    unittest.main()
