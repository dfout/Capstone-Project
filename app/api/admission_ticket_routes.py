from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Review, db, StoreItem, MembershipType, Member, Event, AdmissionTicket, AdmissionTicketPurchase, AdmissionTicketType, TicketTypePurchased
from app.forms.review_form import ReviewForm
from app.forms.ticket_form import TicketForm
from datetime import datetime, date
import os

## Get all available admission ticket instances from db (includes max_particpants, day, month, day of week.)


admission_ticket_routes = Blueprint('admissions', __name__)

@admission_ticket_routes.route('/create',methods=['POST'])
def create_admission():
    '''If the user selects a date that is not already in the database, they create a new instance an admission date'''
    body = request.get_json()
    print("BODYYYYYY-+++++++++++++++++++++", body)
    date=datetime(body['year'], body['month'],body['date'])
    month=body['month']
    year=body['year']
    # day_str = body['day']
    # day = datetime()
 
    new_admission = AdmissionTicket(
        date=body["date"],
        month=body['month'],
        year=body['year'],
        day_of_week = body['day_of_week'],
        max_admissions=body['max_admissions']
    )
    db.session.add(new_admission)
    db.session.commit()

    return {'Admission': new_admission.to_dict()},200


## Works on backend
@admission_ticket_routes.route('/')
def get_admissions():
    '''Grabs all available admission days'''
    # if os.environ.get('FLASK_ENV') == 'production':
    admissions = [x.to_dict() for x in AdmissionTicket.query.all()]

    # else:
    #     admissions = [
            
    #         {"id": 1, "day":date(2024, 8, 6).strftime('%Y-%m-%d'), "day_of_week": "Tuesday", "max_admissions":500},
    #         {"id": 2, "day":date(2024, 8, 7).strftime('%Y-%m-%d'), "day_of_week": "Wednesday", "max_admissions":500},

        
    #     ]

    print("ADMIN---------------------------",admissions)


    return {"Admissions": admissions}


## Create an admission ticket purchase based on information in the Ticket Form

@admission_ticket_routes.route('/purchases/<int:purchase_id>/types/<int:id>', methods=['POST'])
def ticket_type_purchase(purchase_id,id):
    print("ISSUE WHEREEEEEEEEEEEEEEEEEEEEEEEEEEE")
    # id is the ticketType id

    # purchase = AdmissionTicketPurchase.query.filter_by(id=purchase_id).first()
    #general information

    ticket = request.get_json()


    new_ticket_type_purchase = TicketTypePurchased(
        type_id=id,
        purchase_id=purchase_id,
        quantity=ticket["quantity"]
    )

    db.session.add(new_ticket_type_purchase)
    db.session.commit()

    ticket_type_purchase_dict = new_ticket_type_purchase.to_dict()

    return {"TicketTypePurchase": ticket_type_purchase_dict}, 200

    
    

@admission_ticket_routes.route('/purchase', methods=['POST'])
def purchase_admission():
  
    ## Form instance
    # form = TicketForm()

    purchase_data = request.get_json()
    print("PURCHASE----------------------------------------------------",purchase_data)

    admission_id = purchase_data.get("admission_id")
    print("admission_id IDDDDDDDDDDDDDDDDD HERE----- ----- ----- ----- ----- ---- ----- ----", admission_id) #! This works - shows ID of 45
    # return {'AdmissionTicketPurchase': AdmissionTicketPurchase}, 200

    admission = AdmissionTicket.query.filter_by(id=admission_id).first()
    print(admission, "AMIDDDDISOSINSOINOINONINSNOINI") ## Object instance
    maxAdmin = admission.max_admissions
    admission.max_admissions = maxAdmin - purchase_data["ticket_quantity"]
    db.session.commit()

    ticket_purchase = AdmissionTicketPurchase(
        admission_id= admission_id,
        user_id=purchase_data["user_id"],
        total_price=purchase_data["total_price"],
        ticket_quantity=purchase_data["ticket_quantity"],
        member_discount=purchase_data["member_discount"]
    )
    db.session.add(ticket_purchase)
    db.session.commit()

    json_purchase = ticket_purchase.to_dict()
    print("TICKET PURCHASE", json_purchase)
    return {'AdmissionTicketPurchase': json_purchase}, 200

    ## Check the data once the user has submitted the form
    # if form.validate_on_submit():
    #     # Pull out the selected date from the form
    #     selected_date = form.selected_date.data
    #     # Query the db for the admissions information on this particular date
    #     ##!Current issue: There are more individual dates on the front end that the user is able to book than there is in the backend. 
    #     ##? Potential solution. Create an admissions instance for the selected day if it does not exist. 
    #     admission_ticket = AdmissionTicket.query.get(selected_date)
        
    #     if not admission_ticket:
    #         #? Implement that solution
    #         return jsonify({"message": "Selected admission date not found"}), 404

    #     ## If the date exists in the db, initialize:
    #     # a total_price for the users purchase
    #     total_price = 0
    #     # the total ticket quantity
    #     total_quantity = 0
    #     # a member discount if they are a member
    #     member_discount = 0.0

    #     ## if the user is member
    #     if current_user.is_member:
    #         ## find their membership information by their id
    #         member = Member.query.filter_by(user_id=current_user.id).first()
    #         # If you find the member information
    #         if member:
    #             # Grab out their membership type
    #             membership_type = MembershipType.query.get(member.membership_type_id)
    #             # Each membership type has a different discount 
    #             if membership_type:
    #                 if membership_type.id == 1:
    #                     member_discount = 0.10
    #                 elif membership_type.id == 2:
    #                     member_discount = 0.30
    #                 elif membership_type.id == 3:
    #                     member_discount = 1.0  # Free admission for up to four guests

    #     ticket_purchase = AdmissionTicketPurchase(
    #         admission_id=selected_date,
    #         user_id=current_user.id,
    #         total_price=total_price,
    #         ticket_quantity=total_quantity,
    #         member_discount=member_discount
    #     )
    #     db.session.add(ticket_purchase)
    #     db.session.commit()

    #     for ticket_type_form in form.ticket_types:
    #         ticket_type_id = ticket_type_form.type_id.data
    #         quantity = ticket_type_form.quantity.data

    #         ticket_type = AdmissionTicketType.query.get(ticket_type_id)
    #         if not ticket_type:
    #             return jsonify({"message": f"Ticket type {ticket_type_id} not found"}), 404
            
    #         if membership_type and membership_type.id == 3 and total_quantity + quantity <= 4:
    #             total_price += 0  # Free for up to 4 tickets
    #         else:
    #             total_price += ticket_type.price * quantity * (1 - member_discount)
    #         total_quantity += quantity

    #         ticket_type_purchased = TicketTypePurchased(
    #             type_id=ticket_type_id,
    #             purchase_id=ticket_purchase.id,
    #             quantity=quantity
    #         )
    #         db.session.add(ticket_type_purchased)
        
    #     ticket_purchase.total_price = total_price
    #     ticket_purchase.ticket_quantity = total_quantity

    #     ## Check to see if there are enough available admission tickets for the user's purchase
    #     # If max admissions is already capped, (0), then return "Sold Out"
    #     if admission_ticket.max_admissions == 0:
    #         return {"message": "Sorry, this day is sold out."}
    #     # if the selected ticket quantity is greater than what is left for tickets for the day
    #     # tell the user how many tickets are left for the day
    #     elif total_quantity > admission_ticket.max_admissions:
    #         num_tickets_left = admission_ticket.max_admissions
    #         return {'message': f"Sorry, there are only ${num_tickets_left} tickets left for this day."}
    #     # If there are enough admission tickets for their purchase, then subtract their tickets from the admissions total
    #     else:
    #         admission_ticket.max_admissions -= total_quantity

    #     ## Commit the changed instance to the database. 
    #     db.session.commit()
    #     ## Return the AdmissionTicketPurchase information to the user. 
    #     return {"AdmissionTicketPurchase": ticket_purchase.to_dict()}, 201
    
    # ### Future Note: Would like to be able to hold tickets for users if they have them in their cart. 

    # return jsonify({"message": "Invalid form data"}), 400



