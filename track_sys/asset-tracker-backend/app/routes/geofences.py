# app/routes/geofences.py (complete implementation)
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import db
from app.models.geofence import Geofence
from functools import wraps

geofences_bp = Blueprint('geofences', __name__)

@geofences_bp.route('/', methods=['GET'])
@jwt_required()
def get_geofences():
    """Get all geofences for the logged-in user"""
    user_id = get_jwt_identity()
    geofences = Geofence.query.filter_by(user_id=user_id).all()
    return jsonify([geofence.to_dict() for geofence in geofences]), 200

@geofences_bp.route('/<int:geofence_id>', methods=['GET'])
@jwt_required()
def get_geofence(geofence_id):
    """Get a specific geofence"""
    user_id = get_jwt_identity()
    geofence = Geofence.query.filter_by(id=geofence_id, user_id=user_id).first()
    
    if not geofence:
        return jsonify({'message': 'Geofence not found'}), 404
    
    return jsonify(geofence.to_dict()), 200

@geofences_bp.route('/', methods=['POST'])
@jwt_required()
def create_geofence():
    """Create a new geofence"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    geofence = Geofence(
        name=data.get('name'),
        type=data.get('type', 'inclusion'),
        center_lat=data.get('center_lat'),
        center_lng=data.get('center_lng'),
        radius=data.get('radius'),
        status=data.get('status', 'active'),
        user_id=user_id
    )
    
    db.session.add(geofence)
    db.session.commit()
    
    return jsonify({
        'message': 'Geofence created successfully',
        'geofence': geofence.to_dict()
    }), 201

@geofences_bp.route('/<int:geofence_id>', methods=['PUT'])
@jwt_required()
def update_geofence(geofence_id):
    """Update a geofence"""
    user_id = get_jwt_identity()
    geofence = Geofence.query.filter_by(id=geofence_id, user_id=user_id).first()
    
    if not geofence:
        return jsonify({'message': 'Geofence not found'}), 404
    
    data = request.get_json()
    
    if 'name' in data:
        geofence.name = data['name']
    if 'type' in data:
        geofence.type = data['type']
    if 'center_lat' in data:
        geofence.center_lat = data['center_lat']
    if 'center_lng' in data:
        geofence.center_lng = data['center_lng']
    if 'radius' in data:
        geofence.radius = data['radius']
    if 'status' in data:
        geofence.status = data['status']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Geofence updated successfully',
        'geofence': geofence.to_dict()
    }), 200

@geofences_bp.route('/<int:geofence_id>', methods=['DELETE'])
@jwt_required()
def delete_geofence(geofence_id):
    """Delete a geofence"""
    user_id = get_jwt_identity()
    geofence = Geofence.query.filter_by(id=geofence_id, user_id=user_id).first()
    
    if not geofence:
        return jsonify({'message': 'Geofence not found'}), 404
    
    db.session.delete(geofence)
    db.session.commit()
    
    return jsonify({'message': 'Geofence deleted successfully'}), 200

def handle_errors(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({
                'status': 'error',
                'message': str(e)
            }), 500
    return wrapper