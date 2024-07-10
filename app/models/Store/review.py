from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('storeItems.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    storeItems = db.relationship('storeItem', cascade = "all, delete")
    # tags = db.relationship('Topic', cascade= "all, delete")
    # saves = db.relationship('Save', cascade="all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'review':self.review,
            'rating':self.rating,
            'itemId': self.item_id,
            'ownerId':self.user_id,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
