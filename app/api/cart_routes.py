from flask_login import current_user, login_required
from flask import Blueprint, request
from app.models import Review, User, StoreItem, db, CartItem
from app.forms.review_form import ReviewForm

cart_routes = Blueprint('cart', __name__ )


##!likely need to have log-in required. So it can better keep track and find the right instances to delete
## want to figure a better way to let a guest add things to the cart, then upon checkout, they can create an account if they wish. But they can also checkout as a guest. LATER


## POST route is on the items.py routes for adding an item to the cart. 

@cart_routes.route('/')
@login_required
def show_cart():
    '''Get all the current items in the user's cart'''
    user_id = current_user["id"]

    cart_items = [x.to_dict() for x in CartItem.query.filter_by(user_id=user_id).all()]

    return {"CartItems":cart_items}


@cart_routes.route('/<int:item_id>', methods=['PATCH'])
@login_required
def edit_cart_item_quantity(item_id):
    item = CartItem.query.filter(
        CartItem.item_id == item_id,
        CartItem.user_id == current_user.id
    ).first()
    if (item == None):
        return {"message": "item not found"}

    data = request.json
    item.quantity = data['quantity']
    db.session.commit()
    updated_item = item.to_dict()
    return {"CartItem": updated_item}





@cart_routes.route('/<int:item_id>', methods=['DELETE'])
@login_required
def delete_cart_item(item_id):
        item = CartItem.query.filter(
        CartItem.item_id == item_id,
        CartItem.user_id == current_user.id
    ).first()
        if (item == None):
            return {"message": "item not found"}, 404
        
        db.sesion.delete(item)
        db.session.commit()
        return {"CartItemId": item_id}
