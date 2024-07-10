from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class itemCategory(db.Model):
    __tablename__ = 'itemCategories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('storeCategories.id')), nullable=False)

    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('storeItems.id')), nullable=False)




    storeItems = db.relationship('storeItem', cascade = "all, delete")
    storeCategories = db.relationship('storeCategory', cascade= "all, delete")


    def to_dict(self):
        return {
            'id':self.id,
            'categoryId': self.category_id,
            'itemId':self.item_id,
        }