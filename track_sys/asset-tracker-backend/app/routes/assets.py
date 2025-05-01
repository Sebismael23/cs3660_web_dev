from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps

# Debugging imports
import sys
print(f"Python path: {sys.path}")

# Import models
from app import db
from app.models.asset import Asset

assets_bp = Blueprint('assets', __name__)

# Apply error handling decorator to all routes
def handle_errors(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            print(f"Error in assets route: {str(e)}")
            return jsonify({
                'status': 'error',
                'message': str(e)
            }), 500
    return wrapper

@assets_bp.route('/', methods=['GET'])
@jwt_required()
@handle_errors
def get_assets():
    """Get all assets for the logged-in user"""
    user_id = get_jwt_identity()
    print(f"Getting assets for user ID: {user_id}")
    
    assets = Asset.query.filter_by(user_id=user_id).all()
    print(f"Found {len(assets)} assets")
    
    return jsonify([asset.to_dict() for asset in assets]), 200

@assets_bp.route('/<int:asset_id>', methods=['GET'])
@jwt_required()
@handle_errors
def get_asset(asset_id):
    """Get a specific asset"""
    user_id = get_jwt_identity()
    print(f"Getting asset {asset_id} for user {user_id}")
    
    asset = Asset.query.filter_by(id=asset_id, user_id=user_id).first()
    
    if not asset:
        print(f"Asset {asset_id} not found for user {user_id}")
        return jsonify({'message': 'Asset not found'}), 404
    
    return jsonify(asset.to_dict()), 200

@assets_bp.route('/', methods=['POST'])
@jwt_required()
@handle_errors
def create_asset():
    """Create a new asset"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    print(f"Creating asset for user {user_id} with data: {data}")
    
    # Validate required fields
    if not data.get('name'):
        return jsonify({'message': 'Name is required'}), 400
    if not data.get('type'):
        return jsonify({'message': 'Type is required'}), 400
    
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
    
    print(f"Created asset with ID: {asset.id}")
    
    return jsonify({
        'message': 'Asset created successfully',
        'asset': asset.to_dict()
    }), 201

@assets_bp.route('/<int:asset_id>', methods=['PUT'])
@jwt_required()
@handle_errors
def update_asset(asset_id):
    """Update an asset"""
    user_id = get_jwt_identity()
    print(f"Updating asset {asset_id} for user {user_id}")
    
    asset = Asset.query.filter_by(id=asset_id, user_id=user_id).first()
    
    if not asset:
        print(f"Asset {asset_id} not found for user {user_id}")
        return jsonify({'message': 'Asset not found'}), 404
    
    data = request.get_json()
    print(f"Update data: {data}")
    
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
    
    print(f"Asset {asset_id} updated successfully")
    
    return jsonify({
        'message': 'Asset updated successfully',
        'asset': asset.to_dict()
    }), 200

@assets_bp.route('/<int:asset_id>', methods=['DELETE'])
@jwt_required()
@handle_errors
def delete_asset(asset_id):
    """Delete an asset"""
    user_id = get_jwt_identity()
    print(f"Deleting asset {asset_id} for user {user_id}")
    
    asset = Asset.query.filter_by(id=asset_id, user_id=user_id).first()
    
    if not asset:
        print(f"Asset {asset_id} not found for user {user_id}")
        return jsonify({'message': 'Asset not found'}), 404
    
    db.session.delete(asset)
    db.session.commit()
    
    print(f"Asset {asset_id} deleted successfully")
    
    return jsonify({'message': 'Asset deleted successfully'}), 200