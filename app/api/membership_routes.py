from flask_login import current_user, login_required
from flask import Blueprint, request
from app.models import Review, User, StoreItem, db, CartItem, Member, MembershipType
from app.forms.review_form import ReviewForm
from datetime import datetime, timedelta

membership_routes = Blueprint('membership', __name__ )

@membership_routes.route('/')
def get_memberships():
    '''Query to show all available memberships'''
    memberships = [x.to_dict() for x in MembershipType.query.all()]
    return {"Memberships": memberships}


@membership_routes.route('/purchase/<int:membership_id>', methods=["POST"])
@login_required
def purchase_membership(membership_id):
    '''Allows a user to subscribe to a membership'''
    user_id = current_user.id
    user = (User.query.filter_by(user_id=user_id).first()).to_dict()
    if user["is_member"] == False:
        user["is_member"] == True
    id= membership_id
    membership_type_info = (MembershipType.query.filter_by(id=id).first()).to_dict()
    current_datetime = datetime.now()
    next_payment_date = current_datetime + timedelta(days=365)


    new_member = Member(
        user_id = user_id,
        membership_type_id = id,
        curr_card_holders = membership_type_info["cardholders"],
        next_payment = next_payment_date
    )

    db.session.add(new_member)
    db.session.commit()
    new_safe_member = new_member.to_dict()
    new_safe_member["MembershipType"] = membership_type_info

    return {"Member": new_safe_member}



@membership_routes.route('change/<int:membership_id>', methods=["PATCH"])
@login_required
def edit_membership(membership_id):
    '''if a logged in user is also a member they can change their membership to another one'''

    ## a member has a member instance. 

    ## grab the member instance
    ## change it

    membership_type_id = membership_id
    membership = Member.query.filter_by(membership_type_id=membership_type_id)
    id= membership_type_id
    new_membership_info = (MembershipType.query.filter_by(id=id).first()).to_dict()
    membership["membership_type_id"] = membership_type_id
    membership["curr_card_holders"] = new_membership_info["cardholders"]
    
  

    
@membership_routes.route('/<int:membership_id>', methods=["DELETE"])
@login_required
def delete_membership(membership_id):
    '''if a logged in user is also member they can change their membership'''
    membership_type_id = membership_id
    ## delete the member instance
    ## change the user key of is_member to false
    membership = Member.query.filter_by(membership_type_id=membership_type_id).first()
    user_id = current_user.id
    user = (User.query.filter_by(user_id=user_id).first()).to_dict()
    user["is_member"] = False
    db.session.delete(membership)
    db.session.commit()

    return{"message":"Membership successfully canceled"},200