from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class MembershipType(db.Model):
    __tablename__ = "membershipTypes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    billing_cycle = db.Column(db.String(30), nullable=False)
    price_per_cycle = db.Column(db.Float, nullable=False)
    cardholders = db.Column(db.Integer, nullable=False)



    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
            'description': self.description,
            'billingCycle': self.billing_cycle,
            'pricePerCycle': self.price_per_cycle, 
            'cardholders': self.cardholders,
        }
