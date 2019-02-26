# -*-coding:utf-8-*-
from flasgger import swag_from
from flask import (Blueprint, flash, redirect, render_template, request,
                   session, url_for)
from flask_login import login_required, login_user, logout_user
from werkzeug.security import check_password_hash

from app import db
from app.auth.forms import SigninForm, SignupForm
from app.users.models import User
from .apis import *

mod = Blueprint('auth', __name__, url_prefix='/auth')


@mod.route('/signin', methods=['GET', 'POST'])
def signin():
    # If sign in form is submitted
    form = SigninForm()

    if request.method == 'POST':
        if form.validate_on_submit:
            user = User.query.filter_by(email=form.email.data).first()
            if user and check_password_hash(user.password, form.password.data):
                session['username'] = user.username
                session['email'] = user.email
                flash('Welcome %s' % user.username)
                login_user(user)
                return redirect(url_for('users.index'))
            flash('Wrong email or password', 'error-message')

    return render_template("/auth/signin.html", form=form)


@mod.route('/signout', methods=['GET'])
@login_required
def signout():
    logout_user()
    return redirect(url_for('auth.signin'))


@mod.route('/signup', methods=['GET', 'POST'])
@swag_from(signup_spec)
def signup():
    form = SignupForm()

    if request.method == 'POST':
        if not form.validate_on_submit():
            return render_template('/auth/signup.html', form=form), 406
        user = User(username=form.username.data,
                    name=form.name.data,
                    email=form.email.data,
                    password=form.password.data)
        db.session.add(user)
        db.session.commit()

        return "sign in the user and redirect to Home"  # TODO

    elif request.method == 'GET':
        return render_template('/auth/signup.html', form=form)


@mod.route('/<id>', methods=['GET'])
def get_user(id):
    result = User.query.get(id)
    return result.username
