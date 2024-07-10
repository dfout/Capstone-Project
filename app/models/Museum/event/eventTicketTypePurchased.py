from ...db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class eventTicketTypePurchased(db.Model):
    __tablename__ = 'eventTicketTypesPurchased'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('eventTicketTypes.id')), nullable=False)
    purchase_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('eventTicketPurchases.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)


    eventTicketTypes = db.relationship('eventTicketType', cascade='all, delete')
    eventTicketPurchases = db.relationship('eventTicketPurchase', cascade='all,delete')

    def to_dict(self):
        return {
            'id':self.id,
            'typeId':self.type_id,
            'purchaseId':self.purchase_id, 
            'quantity': self.quantity

        }