from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Review, db, StoreItem
from app.forms.review_form import ReviewForm

user_routes = Blueprint('users', __name__, url_prefix='session')


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()



## Make sure user is logged in and the owner of the review 


@user_routes.route('/reviews')
@login_required
def get_user_reviews():
    '''When a user is logged in, they are able to view all their posted reviews'''
    user_id= current_user.id
    reviews = [x.to_dict() for x in Review.query.filter_by(user_id=user_id).all()]
    for review in reviews:
        item_id = review.item_id
        review["Item"] = (StoreItem.query.filter_by(item_id=item_id).first()).to_dict()

    return {"Reviews": reviews}

@user_routes.route('/reviews/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    '''Allows a user to delete a review they have posted'''

    review = Review.query.filter_by(review_id=review_id).first()
    if review != None:
        db.session.delete(review)
        db.session.commit()
        return {'review_id': review_id}
    else:
        return {"message": "Review could not be found"}, 404


@user_routes.route('/reviews/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    '''A logged-in user can edit or update any review they have posted'''

    review = Review.query.filter_by(review_id=review_id).first()

    if review.user_id != current_user.id:
        return {"message": "Not the owner of this review"}, 401
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.review = form.data['review']
        review.stars = form.data['stars']
        db.session.commit()

        reviewObj = review.to_dict()

        return {"Review": reviewObj}
    if form.errors:
        return {"message":"Bad Request", "errors": form.errors}, 400