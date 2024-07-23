from flask_login import current_user, login_required
from flask import Blueprint, request
from app.models import Review, User, StoreItem, db, CartItem, StoreItemImage
from app.forms.review_form import ReviewForm

item_routes = Blueprint('items', __name__)

## Works on backend
@item_routes.route('/')
def all_items():

    '''Get all items on the store page'''
    # try:
    #     items = [x.to_dict() for x in StoreItem.query.all()]
    #     if not items:
    #         print("No items found.")
    #     else:
    #         print(f"Found {len(items)} items.")
    #     for item in items:
    #         print(item)
    #     return {"StoreItems": items}
    # except Exception as e:
    #     print(f"Error fetching items: {e}")
    # return {"error": str(e)}, 500
    # '''Get all items on the store page'''
    items = [x.to_dict() for x in StoreItem.query.all()]
    print(items)

    # for item in items:
    #     ## If I wanted to join categories onto the data
    #     # item['Categories'] = [x.to_dict() for x in ]
    # item[''] = item.

    for item in items:
        item["Images"] = [image.to_dict() for image in StoreItemImage.query.filter_by(item_id=item["id"]).all()]
        ## grab reviews for each item
        item_id = item["id"]
        reviews = [x.to_dict() for x in Review.query.filter_by(item_id=item_id).all()]
        total_rating=0
        count = len(reviews)
        print(reviews)
        print("COUNT COUNT COUNT COUNT COUNT COUNT",count)
        if(count != 0 or count ):
            for review in reviews:
                total_rating+= review["rating"]
            item['avgRating'] = round(total_rating / count, 2)
        else:
            item["avgRating"] = None

    

    return {"Items": items}


## Works on backend too

@item_routes.route('/<int:id>')
def get_item(id):
    '''
    Get one item from the store when clicking on the item, searching by it's id. All the item's reviews will be on this call. 
    '''
  
    item = (StoreItem.query.filter_by(id=id).first()).to_dict()
    if item == None:
        return {"message": "Item could not be found"}, 404

    item["Reviews"] = [x.to_dict() for x in Review.query.filter_by(id=id).all()]
    item_id=id
    item["Images"] = [image.to_dict() for image in StoreItemImage.query.filter_by(item_id=item_id).all()]
    total_rating=0
    count = len(item["Reviews"])
    if count != 0 or count:
        for review in item["Reviews"]:
            total_rating +=review.review
            
        item["avgRating"] = round(total_rating / count, 2)
    else:
        item['avgRating'] = None

    return {"Item": item}

@item_routes.route('/<int:id>/cart', methods=['POST'])
def add_to_cart(id):
    '''A user can add an item to their cart'''


    item = (StoreItem.query.filter_by(id=id).first()).to_dict()

    user_id = ''
    if current_user:
        user_id = current_user.id
    else:
        user_id = None

    if (item != None):
        new_cart_item = CartItem(
            item_id= id,
            user_id= user_id

        )
        db.session.add(new_cart_item)
        db.session.commit()
        cartItemObj = new_cart_item.to_dict()
        return {"CartItem": cartItemObj}
    else:
        return {"message": "Item could not be found"}, 404




@item_routes.route('/<int:id>/reviews')
def get_reviews(id):
    '''Get all reviews for an item on the item's detail page'''
    # user_id = current_user.id
    item_id= int(id)
    reviews = [x.to_dict() for x in Review.query.filter_by(item_id=item_id).all()]
    for review in reviews:
        id=review["ownerId"]
        review['User'] = (User.query.filter_by(id=id).first()).to_dict_no_email_no_last()
        id= item_id
        review["Item"] = (StoreItem.query.filter_by(id=id).first()).to_dict()

    return {"Reviews": reviews}

## NEED AN AUTH ROUTE TO MAKE SURE THEY HAVE PURCHASED THE ITEM THEY WISH TO REVIEW -HANDLE IN THE FRONT END AND CAN HANDLE IN BACK     

@item_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def post_review(id):
    '''If logged in, and user has purchased an item, Post a review on an item'''

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            new_review = Review(
                review=form.data['review'],
                rating=form.data['rating'],
                user_id=current_user.id,
                item_id=id
            )

            db.session.add(new_review)
            db.session.commit()

            safe_review = new_review.to_dict()
            item_id = id
            id = current_user.id
            safe_review["User"] = (User.query.filter_by(id=id).first()).to_dict_no_email_no_last()
            id = item_id
            safe_review["Item"] = (StoreItem.query.filter_by(id=id).first()).to_dict()
            return {"Review": safe_review}
        except Exception as e:
            return {"errors": str(e)}, 500
    else:
        return {"errors": form.errors}, 400
    


