from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Artist(db.Model):
    __tablename__ = "artists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), nullable = True)
    about = db.Column(db.String(1000), nullable = False)
    born = db.Column(db.DateTime(timezone=True), nullable=True)
    died = db.Column(db.DateTime(timezone=True), nullable=True)


    def to_dict(self):
        return {
            'id':self.id,
            'name': self.name,
            'about':self.about,
            'born': self.born,
            'died': self.died,
        }
