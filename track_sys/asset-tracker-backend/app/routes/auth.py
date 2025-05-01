from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from functools import wraps

# Create the blueprint
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    # Import here instead of at the top
    from app import db
    from app.models.user import User
    
    data = request.get_json()
    
    # Check if user already exists
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'message': 'User already exists'}), 409
    
    # Create new user
    user = User(
        name=data.get('name'),
        email=data.get('email')
    )
    user.password = data.get('password') 
    
    # Save to database
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login a user"""
    # Import here instead of at the top
    from app.models.user import User
    
    try:
        data = request.get_json()
        print(f"Login data received: {data}")
        
        email = data.get('email')
        password = data.get('password')
        
        print(f"Email: {email}, Password length: {len(password) if password else 0}")
        
        user = User.query.filter_by(email=email).first()
        print(f"User found: {user is not None}")
        
        if user:
            verification = user.verify_password(password)
            print(f"Password verification result: {verification}")
            print(f"Stored hash: {user.password_hash[:20]}...")
            
        if not user or not user.verify_password(password):
            return jsonify({'message': 'Invalid credentials'}), 401
        
        # Create access token with additional claims
        access_token = create_access_token(
            identity=user.id,
            additional_claims={
                "email": user.email,
                "name": user.name
            }
        )
        
        return jsonify({
            'access_token': access_token,
            'token_type': 'bearer',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Error during login: {str(e)}'}), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    """Get user profile"""
    from app.models.user import User
    
    user_id = get_jwt_identity()
    print(f"Decoded user ID from token: {user_id}")
    
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    return jsonify(user.to_dict()), 200
    

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