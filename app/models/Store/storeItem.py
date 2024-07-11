from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class StoreItem(db.Model):
    __tablename__ = 'storeItems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Float, nullable=False)
    avg_rating = db.Column(db.Float, nullable = True)
    stock = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    # cartItems = db.relationship('CartItem', cascade = "all, delete")
    # itemCategories = db.relationship('ItemCategory', cascade= "all, delete")
    # orderedItems = db.relationship('OrderedItem', cascade="all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
            'description':self.description,
            'price': self.price,
            'avgRating':self.avg_rating,
            'stock':self.stock,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
