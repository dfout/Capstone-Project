from flask_login import current_user, login_required
from flask import Blueprint, request
from app.models import Review, User, StoreItem, db
from app.forms.review_form import ReviewForm

item_routes = Blueprint('item', __name__, url_prefix='/store')

@item_routes.route('/items')
def all_items():
    '''Get all items on the store page'''
    items = [x.to_dict() for x in StoreItem.query.all()]
    # for item in items:
    #     ## If I wanted to join categories onto the data
    #     # item['Categories'] = [x.to_dict() for x in ]
    # item[''] = item.

    return {"StoreItems": items}




@item_routes.route('/items/<int:id>')
def get_item(id):
    '''
    Get one item from the store when clicking on the item, searching by it's id
    '''
    item_id = id
    item = StoreItem.query.filter_by(id=id).first()
    if item == None:
        return {"message": "Item could not be found"}, 404
    itemObj = item.to_dict()
    itemObj["Reviews"] = [x.to_dict() for x in Review.query.filter_by(item_id=item_id).all()]

    return {"Item": itemObj}


@item_routes.route('/items/<int:item_id>')
def get_reviews(item_id):
    '''Get all reviews for an item on the item's detail page'''
    user_id = current_user.id
    reviews = [x.to_dict() for x in Review.query.filter_by(item_id=item_id).all()]
    for review in reviews:
        review['User'] = User.query.filter_by(user_id=user_id).first().to_dict_no_email()

    return {"Reviews": reviews}

## NEED AN AUTH ROUTE TO MAKE SURE THEY HAVE PURCHASED THE ITEM THEY WISH TO REVIEW -HANDLE IN THE FRONT END AND CAN HANDLE IN BACK     

@item_routes.route('/items/<int:item_id>', methods=['POST'])
@login_required
def post_review(item_id):
    '''If logged in, and user has purchased an item, Post a review on an item'''

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            review = form.data['review'],
            stars = form.data['stars'],
            user_id = current_user.id,
            item_id = item_id
        )

        db.session.add(new_review)
        db.session.commit()

        safe_review = new_review.to_dict()
        return {"Review": safe_review}

    if form.errors:
        print(form.errors)
        return{"message": "Bad Request", "errors": form.errors}, 400
    
