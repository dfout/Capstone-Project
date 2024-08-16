## Would like to have adult, senior, visitor with disability, student, child

## adult = 30
## senior = 22
## vistor w disability = 22
##student = 17
##child = 0 
from app.models import db, TicketTypePurchased, AdmissionTicketType, environment, SCHEMA
from sqlalchemy.sql import text

def seed_ticket_types():
    ticket_types=[
        {
            "type": "Adult",
            "description":"",
            "price": 22,

        },
        {
            "type": "Senior", 
            "description": "65 and over with ID",
            "price": 22

        },
        {
            "type": "Visitor with Disability",
            "description": "Free admission for a care partner accompanying a visitor with a disability",
            "price": 22,
        },
        {   
            "type": "Student",
            "description": "Full-time with ID, including international students",
            "price": 17,

        },
        {
            "type": "Child",
            "description": "16 and under",
            "price": 0

        },
    ]

    for ticket_type in ticket_types:
        ticket_type_entry = AdmissionTicketType(
            type=ticket_type["type"],
            description=ticket_type["description"],
            price=ticket_type["price"]
        )
        db.session.add(ticket_type_entry)
    db.session.commit()

def undo_ticket_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.admission_ticket_types RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM admission_ticket_types"))

    db.session.commit()