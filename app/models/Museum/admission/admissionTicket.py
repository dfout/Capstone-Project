from ...db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class AdmissionTicket(db.Model):
    __tablename__ = 'admissionTickets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.DateTime(timezone=True), nullable=False)
    max_admissions = db.Column(db.Integer, default= 500)


    # tags = db.relationship('Topic', cascade= "all, delete")
    # saves = db.relationship('Save', cascade="all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'day':self.day,
            'max_admissions':self.max_admissions
        }
