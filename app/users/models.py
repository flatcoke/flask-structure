# -*- coding:utf-8 -*-
from flask_login import UserMixin
from sqlalchemy.orm.exc import NoResultFound
from werkzeug.security import check_password_hash, generate_password_hash

from app import db, login_manager


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(54), nullable=False)
    level = db.Column(db.Integer, nullable=False, default=10)
    active = db.Column(db.SmallInteger, nullable=False, default=True)
    addresses = db.relationship('Address')

    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def __init__(self, username, name, email, password):
        self.username = username
        self.name = name
        self.email = email
        self.set_password(password)

    def __repr__(self):
        return '<User %s>' % self.username

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @classmethod
    def get(cls, user_id):
        """

        :rtype: object
        :type user_id: int
        """
        try:
            return User.query.filter_by(id=user_id).one()
        except NoResultFound:
            return None


class Address(db.Model):
    __tablename__ = 'addresses'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="addresses")

    address = db.Column(db.String(20), nullable=False)

    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
