from ...db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class TicketTypePurchased(db.Model):
    __tablename__ = "ticket_types_purchased"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type_id = db.Column(db.Integer, nullable=False)
    purchase_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)


    # admissionTicketTypes = db.relationship("AdmissionTicketType", cascade='all, delete')
    # admissionTicketPurchases = db.relationship("AdmissionTicketPurchase", cascade='all,delete')
    # tags = db.relationship('Topic', cascade= "all, delete")
    # saves = db.relationship('Save', cascade="all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'typeId':self.type_id,
            'purchaseId':self.purchase_id, 
            'quantity': self.quantity

        }