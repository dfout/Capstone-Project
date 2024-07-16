from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Review, db, StoreItem, MembershipType, Member, Event, Exposition, ExpositionImage


exposition_routes = Blueprint('exhibitions', __name__ )


@exposition_routes.route('/')
def get_expositions():
    '''Route to get all exhbitions'''
    expositions = [x.to_dict() for x in Exposition.query.all()]
    print(expositions, "EXPOSITIONS")
    if expositions == None:
        return {"message": "No Current Exhibitions"}, 404

    for exposition in expositions:
        print("--------------",exposition,"-----------------------------")
        exposition_id = exposition["id"]
        exposition["Images"] = [image.to_dict() for image in ExpositionImage.query.filter_by(exposition_id=exposition_id).all()]
        

    return {"Exhibitions": expositions}


@exposition_routes.route('/<int:id>')
def get_exposition_details(id):
    '''A user can see specific exposition details'''

    exposition = (Exposition.query.filter_by(id=id).first()).to_dict()
    if not exposition:
        return {"message": "Exposition not found"}, 404
 
    exposition_dict = exposition.to_dict()
    exposition_dict["Images"] = [image.to_dict() for image in ExpositionImage.query.filter_by(exposition_id=id).all()]


    return {"Exhibition": exposition_dict}