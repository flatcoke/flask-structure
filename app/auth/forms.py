# -*- coding:utf-8 -*-
from flask_wtf import Form
from wtforms import BooleanField, PasswordField, StringField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo

from app.users.models import User


class SigninForm(Form):
    """ login form"""

    email = StringField(
        'Email Address',
        [Email(),
         DataRequired(message='Forgot your email address?'), ], )
    password = PasswordField(
        'Password',
        [DataRequired(message='Must provide a password.'), ], )
    remember = BooleanField()


class SignupForm(Form):
    username = StringField('Id', [DataRequired("Please enter your id")])
    name = StringField('Name', [DataRequired("Please enter your name")])
    email = StringField(
        'Email',
        [Email(),
         DataRequired("Please enter your email address."), ], )
    password = PasswordField(
        'Password',
        [DataRequired("Please enter your a password."),
         EqualTo('confirm', message="Passwords must match"), ], )
    confirm = PasswordField('Re-enter Password',
                            [DataRequired("Repeat Password")])
    submit = SubmitField("Register Now")

    def __init__(self, *args, **kwargs):
        Form.__init__(self, *args, **kwargs)

    def validate_on_submit(self):
        """

        :rtype: bool
        """
        if not Form.validate_on_submit(self):
            return False

        email = User.query.filter_by(
            email=self.email.data.lower()).first()
        username = User.query.filter_by(
            username=self.username.data.lower()).first()
        if username:
            self.username.errors.append("That username is already taken")
            return False
        if email:
            self.email.errors.append("That email is already taken")
            return False
        return True
