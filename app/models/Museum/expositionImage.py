from ..db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ExpositionImage(db.Model):
    __tablename__ = 'expositionImages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    exposition_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('expositions.id')), nullable=False)
    piece_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pieces.id')), nullable=False)
    url = db.Column(db.String(60), nullable=False)

    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    pieces = db.relationship('Piece', cascade = "all, delete")


    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
            'expositionId': self.exposition_id,
            'pieceId':self.piece_id,
            'url': self.url,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
