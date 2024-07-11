from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class StoreOrder(db.Model):
    __tablename__ = "store_orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    purchaser_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    status= db.Column(db.String(50), nullable=True)
    purchased_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    users = db.relationship("User", cascade = "all, delete")
    # tags = db.relationship('Topic', cascade= "all, delete")
    # saves = db.relationship('Save', cascade="all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'purchaserId':self.purchaser_id,
            'status':self.status,
            'itemId': self.item_id,
            'purchasedOn':self.purchased_on,
            'updatedAt':self.updated_at
        }
