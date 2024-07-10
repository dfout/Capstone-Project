from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Exposition(db.Model):
    __tablename__ = 'expositions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(1500), nullable=False)
    gallery_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('galleries.id')), nullable=False)
    showing_start_date = db.Column(db.DateTime(timezone=True), nullable = True)
    showing_end_date = db.Column(db.DateTime(timezone=True), nullable = True)

    galleries = db.relationship('Gallery', cascade = "all, delete")


    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
            'description':self.description,
            'igalleryId': self.gallery_id,
            'ownerId':self.user_id,
            'showingStartDate':self.showing_start_date,
            'showingEndDate':self.showing_end_date
        }
