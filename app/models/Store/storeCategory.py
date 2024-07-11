from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class StoreCategory(db.Model):
    __tablename__ = "store_categories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(25), nullable=False)

    itemCategories = db.relationship("ItemCategory", cascade= "all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
            'description':self.description,
        }
