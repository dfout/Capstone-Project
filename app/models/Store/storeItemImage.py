from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class StoreItemImage(db.Model):
    __tablename__ = "storeItemImages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("storeItems.id")), nullable=False)
    url= db.Column(db.String(300), nullable=False)

    storeItems = db.relationship("StoreItem", cascade = "all, delete")

   

    def to_dict(self):
        return {
            'id':self.id,
            'itemId': self.item_id,
            'url':self.url
        }