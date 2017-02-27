# -*-coding:utf-8-*-
from flask import (Blueprint, flash, redirect, render_template, request,
                   session, url_for)
from werkzeug.security import check_password_hash

from app import db
from app.auth.forms import SigninForm, SignupForm
from app.auth.models import User

mod = Blueprint('auth', __name__, url_prefix='/auth')


@mod.route('/signin/', methods=['GET', 'POST'])
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
                return redirect(url_for('forc.index'))
            flash('Wrong email or password', 'error-message')

    return render_template("/auth/signin.html", form=form)


@mod.route('/signup/', methods=['GET', 'POST'])
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
