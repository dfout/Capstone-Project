from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Review, db, StoreItem, MembershipType, Member, Event, AdmissionTicket, AdmissionTicketPurchase, AdmissionTicketType, TicketTypePurchased
from app.forms.review_form import ReviewForm
from app.forms.ticket_form import TicketForm
from datetime import datetime

## Get all available admission ticket instances from db (includes max_particpants, day, month, day of week.)


admission_ticket_routes = Blueprint('admission', __name__)

## Works on backend
@admission_ticket_routes.route('/')
def get_admissions():
    '''Grabs all available admission days'''
    admissions = [x.to_dict() for x in AdmissionTicket.query.all()]


    return {"Admissions": admissions}


## Create an admission ticket purchase based on information in the Ticket Form

@admission_ticket_routes.route('/purchase', methods=['POST'])
def purchase_admission():
    form = TicketForm()
    
    if form.validate_on_submit():
        selected_date = form.selected_date.data
        admission_ticket = AdmissionTicket.query.get(selected_date)
        
        if not admission_ticket:
            return jsonify({"message": "Selected admission date not found"}), 404

        total_price = 0
        total_quantity = 0
        member_discount = 0.0

        if current_user.is_member:
            member = Member.query.filter_by(user_id=current_user.id).first()
            if member:
                membership_type = MembershipType.query.get(member.membership_type_id)
                if membership_type:
                    if membership_type.id == 1:
                        member_discount = 0.10
                    elif membership_type.id == 2:
                        member_discount = 0.30
                    elif membership_type.id == 3:
                        member_discount = 1.0  # Free admission for up to four guests

        ticket_purchase = AdmissionTicketPurchase(
            admission_id=selected_date,
            user_id=current_user.id,
            total_price=total_price,
            ticket_quantity=total_quantity,
            member_discount=member_discount
        )
        db.session.add(ticket_purchase)
        db.session.commit()

        for ticket_type_form in form.ticket_types:
            ticket_type_id = ticket_type_form.type_id.data
            quantity = ticket_type_form.quantity.data

            ticket_type = AdmissionTicketType.query.get(ticket_type_id)
            if not ticket_type:
                return jsonify({"message": f"Ticket type {ticket_type_id} not found"}), 404
            
            if membership_type and membership_type.id == 3 and total_quantity + quantity <= 4:
                total_price += 0  # Free for up to 4 tickets
            else:
                total_price += ticket_type.price * quantity * (1 - member_discount)
            total_quantity += quantity

            ticket_type_purchased = TicketTypePurchased(
                type_id=ticket_type_id,
                purchase_id=ticket_purchase.id,
                quantity=quantity
            )
            db.session.add(ticket_type_purchased)
        
        ticket_purchase.total_price = total_price
        ticket_purchase.ticket_quantity = total_quantity

        # Update max_admissions
        admission_ticket.max_admissions -= total_quantity

        db.session.commit()

        return {"AdmissionTicketPurchase": ticket_purchase.to_dict()}, 201

    return jsonify({"message": "Invalid form data"}), 400

