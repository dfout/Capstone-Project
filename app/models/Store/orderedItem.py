from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class OrderedItem(db.Model):
    __tablename__ = 'orderedItems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('storeOrders.id')), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('storeItems.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    
    storeOrders = db.relationship('StoreOrder', cascade='all, delete')
    # tags = db.relationship('Topic', cascade= "all, delete")
    # saves = db.relationship('Save', cascade="all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'orderId':self.order_id,
            'itemId': self.item_id,
            'quantity':self.quantity
        }
