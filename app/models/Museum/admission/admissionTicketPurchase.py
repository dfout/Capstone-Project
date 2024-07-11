from ...db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class AdmissionTicketPurchase(db.Model):
    __tablename__ = "admissionTicketPurchases"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    admission_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('admissionTickets.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    ticket_quantity = db.Column(db.Integer, nullable=True)
    member_discount = db.Column(db.Float, nullable=False)
    purchased_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())


    admissionTickets = db.relationship("AdmissionTicket", cascade='all, delete')
    users = db.relationship("User", cascade='all,delete')
    # tags = db.relationship('Topic', cascade= "all, delete")
    # saves = db.relationship('Save', cascade="all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'admissionId':self.admission_id,
            'userId':self.user_id, 
            'totalPrice': self.total_price, 
            'ticketQuantity': self.ticket_quantity, 
            'memberDiscount': self.member_discount, 
            'purchasedOn': self.purchased_on, 
            'updatedAt': self.updated_at

        }