from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Review, db, StoreItem, MembershipType, Member, Event, Exposition, ExpositionImage


exposition_routes = Blueprint('expositions', __name__ )


@exposition_routes.route('/')
def get_expositions():
    '''Route to get all exhbitions'''
    expositions = [x.to_dict() for x in Exposition.query.all()]

    if expositions == None:
        return {"message": "No Current Exhibitions"}, 404
    for exposition in expositions:
        exposition_id= exposition.id
        exposition["Images"] = ExpositionImage.query.filter_by(exposition_id=exposition_id)

    return {"Exhibitions": expositions}
