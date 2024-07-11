from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Piece(db.Model):
    __tablename__ = "pieces"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime(timezone=True), nullable=True)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('artists.id')), nullable=True)
    exposition_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('expositions.id')), nullable=True)
    gallery_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('galleries.id')), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    artists = db.relationship("Artist", cascade = "all, delete")
    expositions = db.relationship("Exposition", cascade = "all, delete")
    galleries = db.relationship("Gallery", cascade = "all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
            'description':self.description,
            'date': self.date,
            'artistId':self.artist_id,
            'expositionId': self.exposition_id, 
            'galleryId': self.gallery_id, 
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
