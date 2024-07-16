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


@exposition_routes.route('/<int:id>')
def get_exposition_details(id):
    '''A user can see specific exposition details'''

    exposition = (Exposition.query.filter_by(id=id).first()).to_dict()
    exposition_id = id
    exposition["Images"] = ExpositionImage.query.filter_by(exposition_id=exposition_id).all()


    return {"Exhibition": exposition}