from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity


from app import db
from app.models.asset import Asset

assets_bp = Blueprint('assets', __name__)

@assets_bp.route('/', methods=['GET'])
@jwt_required()
def get_assets():
    """Get all assets for the logged-in user"""
    user_id = get_jwt_identity()
    assets = Asset.query.filter_by(user_id=user_id).all()
    return jsonify([asset.to_dict() for asset in assets]), 200

@assets_bp.route('/<int:asset_id>', methods=['GET'])
@jwt_required()
def get_asset(asset_id):
    """Get a specific asset"""
    user_id = get_jwt_identity()
    asset = Asset.query.filter_by(id=asset_id, user_id=user_id).first()
    
    if not asset:
        return jsonify({'message': 'Asset not found'}), 404
    
    return jsonify(asset.to_dict()), 200

@assets_bp.route('/', methods=['POST'])
@jwt_required()
def create_asset():
    """Create a new asset"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    asset = Asset(
        name=data.get('name'),
        type=data.get('type'),
        status=data.get('status', 'active'),
        lat=data.get('lat'),
        lng=data.get('lng'),
        user_id=user_id
    )
    
    db.session.add(asset)
    db.session.commit()
    
    return jsonify({
        'message': 'Asset created successfully',
        'asset': asset.to_dict()
    }), 201

@assets_bp.route('/<int:asset_id>', methods=['PUT'])
@jwt_required()
def update_asset(asset_id):
    """Update an asset"""
    user_id = get_jwt_identity()
    asset = Asset.query.filter_by(id=asset_id, user_id=user_id).first()
    
    if not asset:
        return jsonify({'message': 'Asset not found'}), 404
    
    data = request.get_json()
    
    if 'name' in data:
        asset.name = data['name']
    if 'type' in data:
        asset.type = data['type']
    if 'status' in data:
        asset.status = data['status']
    if 'lat' in data:
        asset.lat = data['lat']
    if 'lng' in data:
        asset.lng = data['lng']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Asset updated successfully',
        'asset': asset.to_dict()
    }), 200

@assets_bp.route('/<int:asset_id>', methods=['DELETE'])
@jwt_required()
def delete_asset(asset_id):
    """Delete an asset"""
    user_id = get_jwt_identity()
    asset = Asset.query.filter_by(id=asset_id, user_id=user_id).first()
    
    if not asset:
        return jsonify({'message': 'Asset not found'}), 404
    
    db.session.delete(asset)
    db.session.commit()
    
    return jsonify({'message': 'Asset deleted successfully'}), 200