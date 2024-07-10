from ...db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000), nullable=False)
    location = db.Column(db.String(400), nullable = True)
    gallery_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('galleries.id')), nullable=False)
    max_participants = db.Column(db.Integer, nullable=True)
    date= db.Column(db.Datetime(timezone=True), server_default=db.func.now())
    is_free = db.Column(db.Boolean, nullable=False)
    is_free_with_admission = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())


    galleries = db.relationship('Gallery', cascade = "all, delete")


    def to_dict(self):
        return {
            'id':self.id,
            'description': self.description,
            'location':self.location,
            'galleryId': self.gallery_id,
            'maxParticipants': self.max_participants, 
            'date': self.date, 
            'isFree': self.is_free, 
            'isFreeWithAdmission': self.is_free_with_admission,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
