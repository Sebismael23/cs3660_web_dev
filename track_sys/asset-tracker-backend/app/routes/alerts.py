# app/routes/alerts.py 
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import db
from app.models.alert import Alert
from app.models.asset import Asset
from functools import wraps

alerts_bp = Blueprint('alerts', __name__)

@alerts_bp.route('/', methods=['GET'])
@jwt_required()
def get_alerts():
    """Get all alerts for the logged-in user's assets"""
    user_id = get_jwt_identity()
    
    # Find all assets belonging to the user
    assets = Asset.query.filter_by(user_id=user_id).all()
    asset_ids = [asset.id for asset in assets]
    
    # Find all alerts for these assets
    alerts = Alert.query.filter(Alert.asset_id.in_(asset_ids)).all()
    
    return jsonify([alert.to_dict() for alert in alerts]), 200

@alerts_bp.route('/<int:alert_id>', methods=['GET'])
@jwt_required()
def get_alert(alert_id):
    """Get a specific alert"""
    user_id = get_jwt_identity()
    
    # Find all assets belonging to the user
    assets = Asset.query.filter_by(user_id=user_id).all()
    asset_ids = [asset.id for asset in assets]
    
    # Find the specific alert for these assets
    alert = Alert.query.filter_by(id=alert_id).filter(Alert.asset_id.in_(asset_ids)).first()
    
    if not alert:
        return jsonify({'message': 'Alert not found'}), 404
    
    return jsonify(alert.to_dict()), 200

@alerts_bp.route('/<int:alert_id>', methods=['PUT'])
@jwt_required()
def update_alert_status(alert_id):
    """Update an alert's status"""
    user_id = get_jwt_identity()
    
    # Find all assets belonging to the user
    assets = Asset.query.filter_by(user_id=user_id).all()
    asset_ids = [asset.id for asset in assets]
    
    # Find the specific alert for these assets
    alert = Alert.query.filter_by(id=alert_id).filter(Alert.asset_id.in_(asset_ids)).first()
    
    if not alert:
        return jsonify({'message': 'Alert not found'}), 404
    
    data = request.get_json()
    if 'status' in data:
        alert.status = data['status']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Alert updated successfully',
        'alert': alert.to_dict()
    }), 200
    
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