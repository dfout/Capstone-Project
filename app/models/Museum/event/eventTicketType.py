from ...db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class EventTicketType(db.Model):
    __tablename__ = 'eventTicketTypes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=False)
    type = db.Column(db.String(40), nullable=False), 
    description = db.Column(db.String(50), nullable=True)
    price = db.Column(db.Float, nullable=False)


    events = db.relationship('Event', cascade='all, delete')

    # tags = db.relationship('Topic', cascade= "all, delete")
    # saves = db.relationship('Save', cascade="all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'eventId':self.event_id,
            'type':self.type, 
            'description': self.description, 
            'price': self.price, 
        }