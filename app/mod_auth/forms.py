# Import Form and RecaptchaField (optional)
from flask_wtf import Form, validators

# Import Form elements such as TextField and BooleanField (optional)
from wtforms import StringField, PasswordField, SubmitField

# Import Form validators
from wtforms.validators import DataRequired, Email, EqualTo

# Form and DB
from models import User


# Define the login form (WTForms)

class SigninForm(Form):
    email = StringField(
        'Email Address', [Email(),
        DataRequired(message='Forgot your email address?'), ], )
    password = PasswordField(
        'Password', [DataRequired(message='Must provide a password.'), ], )


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

    @property
    def validate_on_submit(self):
        """

        :rtype: object
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


