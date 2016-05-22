# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy.orm.exc import NoResultFound


# Define a base model for other database tables to inherit
class UserBase(db.Model):
    __abstract__ = True

    # Id Primary_key
    id = db.Column(db.Integer, primary_key=True)

    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(),
                              onupdate=db.func.current_timestamp())


# Define a User model
class User(UserBase):
    __tablename__ = 'user'

    # User Name
    username = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(128), nullable=False)

    # Identification Data: email & password
    email = db.Column(db.String(128), nullable=False, unique=True)
    # password hash value
    password = db.Column(db.String(54), nullable=False)

    # Authorisation Data: level & acitve
    level = db.Column(db.Integer, nullable=False, default=10)
    active = db.Column(db.SmallInteger, nullable=False, default=True)

    # New instance instantiation procedure
    def __init__(self, username, name, email, password):
        self.username = username
        self.name = name
        self.email = email
        self.set_password(password)

    def __repr__(self):
        return '<User %s>' % (self.username)

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
