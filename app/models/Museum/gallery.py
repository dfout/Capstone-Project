from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Gallery(db.Model):
    __tablename__ = 'galleries'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable = False)
    floor = db.Column(db.String(30), nullable = False)


    def to_dict(self):
        return {
            'id':self.id,
            'name': self.name,
            'floor':self.floor,
        }
