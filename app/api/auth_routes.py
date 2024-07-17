from flask import Blueprint, request
from app.models import User, db, Member, MembershipType
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import join

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        id=current_user.id
        user = (User.query.filter_by(id=id).first()).to_dict()
        user_id = current_user.id
        if user['isMember'] == True or user["isMember"] == 1:
            member_info = (Member.query.filter_by(user_id=user_id).first()).to_dict()

            id = member_info["membershipTypeId"]
            
            user["MembershipDetails"] = member_info
            member_info["MembershipType"] = (MembershipType.query.filter_by(id=id).first()).to_dict()
           
        return user
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).join(Member).join(MembershipType).first()
        print("USER-------------", user)
        


        login_user(user)

        # user = user.to_dict()
        # user_id = user["id"]
        # if user['isMember'] == True:
        #     member_info = (Member.query.filter_by(user_id=user_id).first()).to_dict()

        #     id = member_info["membershipTypeId"]
            
        #     user["MembershipDetails"] = member_info
        #     member_info["MembershipType"] = (MembershipType.query.filter_by(id=id).first()).to_dict()
        #     print("USER________________", user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401