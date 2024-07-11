from ...db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class AdmissionTicketType(db.Model):
    __tablename__ = "admission_ticket_types"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    admission_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('admission_tickets.id')), nullable=False)
    type = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=False)


    admissionTickets = db.relationship("AdmissionTicket", cascade='all, delete')

    # tags = db.relationship('Topic', cascade= "all, delete")
    # saves = db.relationship('Save', cascade="all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'admissionId':self.admission_id,
            'type':self.type, 
            'description': self.description, 
            'price': self.price, 
        }