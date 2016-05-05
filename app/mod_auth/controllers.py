# Import flask dependencies
from flask import Blueprint, request, render_template, \
    flash, session, redirect, url_for

# Import password / encryption helper tools
from werkzeug.security import check_password_hash, generate_password_hash

# Import the database object from the main app module
from app import db

# Import module forms
from app.mod_auth.forms import SigninForm, SignupForm

# Import module models (i.e. User)
from app.mod_auth.models import User

# Define the blueprint: 'auth', set its url prefix: app.url/auth
mod_auth = Blueprint('auth', __name__, url_prefix='/auth')


# Set the route and accepted methods
@mod_auth.route('/signin/', methods=['GET', 'POST'])
def signin():
    # If sign in form is submitted
    form = SigninForm(request.form)

    # Verify the sign in form
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and check_password_hash(user.password, form.password.data):
            session['user_id'] = user.id
            flash('Welcome %s' % user.name)
            return redirect(url_for('auth.home'))
        flash('Wrong email or password', 'error-message')

    return render_template("auth/signin.html", form=form)


@mod_auth.route('/signup/', methods=['GET', 'POST'])
def signup():
    form = SignupForm()

    if request.method == 'POST':
        if not form.validate():
            return render_template('/auth/signup.html', form=form)
        else:
            newuser = User(form.username.data, form.name.data, form.email.data, form.password.data)
            db.session.add(newuser)
            db.session.commit()

            return "sign in the user and redirect to Home"  # TODO

    elif request.method == 'GET':
        return render_template('/auth/signup.html', form=form)
