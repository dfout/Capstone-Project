from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Review, db, StoreItem, MembershipType, Member, TicketTypePurchased, AdmissionTicket, AdmissionTicketPurchase, AdmissionTicketType
from app.forms.review_form import ReviewForm
from datetime import datetime

user_routes = Blueprint('users', __name__)


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
    


@user_routes.route('/membership')
@login_required
def get_membership_details():
    '''A logged-in user with a membership can see their membership purchase records, next payments, payment details, membership details, and perks from their account page'''
    user_id = current_user.id
    member_info = Member.query.filter_by(user_id=user_id).first()

    if(member_info == None):
        return {"message": "User is not a member"}

    return {"Member": member_info}







@user_routes.route('/purchases/<int:purchase_id>', methods=['PUT'])
@login_required
def edit_admission_purchase(purchase_id):
    '''A logged in user '''
    data = request.get_json()
    
    ticket_types = data.get('ticket_types', [])
    if not ticket_types:
        return jsonify({"message": "No ticket types provided"}), 400
    
    ticket_purchase = AdmissionTicketPurchase.query.get(purchase_id)
    if not ticket_purchase or ticket_purchase.user_id != current_user.id:
        return jsonify({"message": "Purchase not found or not authorized"}), 404

    total_price = 0
    total_quantity = 0

    # Retrieve the user's membership discount
    member_discount = ticket_purchase.member_discount

    # Retrieve the original total quantity to update max_admissions correctly
    original_total_quantity = ticket_purchase.ticket_quantity
    
    # Update the ticket types purchased
    existing_tickets = {tp.type_id: tp for tp in TicketTypePurchased.query.filter_by(purchase_id=purchase_id).all()}
    updated_tickets = {}

    for ticket_type_data in ticket_types:
        ticket_type_id = ticket_type_data['type_id']
        quantity = ticket_type_data['quantity']
        
        if quantity < 0:
            return jsonify({"message": "Quantity cannot be negative"}), 400

        ticket_type = AdmissionTicketType.query.get(ticket_type_id)
        if not ticket_type:
            return jsonify({"message": f"Ticket type {ticket_type_id} not found"}), 404
        
        if quantity > 0:
            if ticket_type_id in existing_tickets:
                existing_tickets[ticket_type_id].quantity = quantity
            else:
                new_ticket = TicketTypePurchased(
                    type_id=ticket_type_id,
                    purchase_id=purchase_id,
                    quantity=quantity
                )
                db.session.add(new_ticket)
            
            total_price += ticket_type.price * quantity * (1 - member_discount)
            total_quantity += quantity
            updated_tickets[ticket_type_id] = quantity

    # Delete ticket types that are no longer in the purchase
    for ticket_type_id, ticket in existing_tickets.items():
        if ticket_type_id not in updated_tickets:
            db.session.delete(ticket)

    # Update max_admissions
    admission_ticket = AdmissionTicket.query.get(ticket_purchase.admission_id)
    admission_ticket.max_admissions += original_total_quantity - total_quantity

    ticket_purchase.total_price = total_price
    ticket_purchase.ticket_quantity = total_quantity
    ticket_purchase.updated_at = datetime.utcnow()
    db.session.commit()

    return {"AdmissionTicketPurchase": ticket_purchase.to_dict()}, 200



@user_routes.route('/purchases/<int:purchase_id>', methods=['DELETE'])
@login_required
def cancel_admission_purchase(purchase_id):
    '''A logged in user who has purchased admission tickets, can cancel or delete their purchase. This would get rid of all tickets they have purchased.'''
    ticket_purchase = AdmissionTicketPurchase.query.get(purchase_id)
    if not ticket_purchase or ticket_purchase.user_id != current_user.id:
        return jsonify({"message": "Purchase not found or not authorized"}), 404

    # Retrieve the total quantity before deletion
    total_quantity = ticket_purchase.ticket_quantity

    # Delete all associated TicketTypePurchased entries
    TicketTypePurchased.query.filter_by(purchase_id=purchase_id).delete()

    # Update max_admissions
    admission_ticket = AdmissionTicket.query.get(ticket_purchase.admission_id)
    admission_ticket.max_admissions += total_quantity

    # Delete the AdmissionTicketPurchase entry
    db.session.delete(ticket_purchase)
    db.session.commit()

    return {"message": "Admission ticket purchase canceled successfully"}, 200

