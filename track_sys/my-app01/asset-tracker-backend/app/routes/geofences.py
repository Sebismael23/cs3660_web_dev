# app/routes/geofences.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import db
from app.models.geofence import Geofence

geofences_bp = Blueprint('geofences', __name__)

@geofences_bp.route('/', methods=['GET'])
@jwt_required()
def get_geofences():
    """Get all geofences for the logged-in user"""
    user_id = get_jwt_identity()
    geofences = Geofence.query.filter_by(user_id=user_id).all()
    return jsonify([geofence.to_dict() for geofence in geofences]), 200

