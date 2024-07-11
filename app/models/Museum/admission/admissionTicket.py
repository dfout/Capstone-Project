from ...db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class AdmissionTicket(db.Model):
    __tablename__ = "admissionTickets"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.DateTime(timezone=True), nullable=False)
    max_admissions = db.Column(db.Integer, default= 500)
    day_of_week = db.Column(db.String(10), nullable=False)


    # tags = db.relationship('Topic', cascade= "all, delete")
    # saves = db.relationship('Save', cascade="all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'day':self.day,
            'max_admissions':self.max_admissions,
            'day_of_week': self.day_of_week
        }
