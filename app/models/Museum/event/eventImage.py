from ...db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class EventImage(db.Model):
    __tablename__ = "event_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)

    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=False)
    url = db.Column(db.String(255), nullable=False)

    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    events = db.relationship("Event", cascade = "all, delete")


    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
            'pieceId':self.piece_id,
            'url': self.url,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
