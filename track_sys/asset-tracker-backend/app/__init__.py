# app/__init__.py

# At the top of each file
print(f"Starting import of {__name__}")

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os
import sys

# Add parent directory to path so we can import config
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config.config import config_dict

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config_dict[config_name])
    
    # Ensure instance folder exists
    os.makedirs(app.instance_path, exist_ok=True)
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    # Configure JWT
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.config['JWT_HEADER_TYPE'] = 'Bearer'
    
    # JWT error handlers
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return {"message": "The token has expired"}, 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return {"message": "Invalid token"}, 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return {"message": "Authorization token is missing"}, 401
    
    @jwt.token_verification_failed_loader
    def token_verification_failed_callback(jwt_header, jwt_payload):
        print(f"JWT verification failed: {jwt_header}, {jwt_payload}")
        return {"message": "Token verification failed"}, 401
    
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:5173"],  
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Register blueprints
    print("Registering blueprints...")
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    from app.routes.assets import assets_bp
    app.register_blueprint(assets_bp, url_prefix='/api/assets')
    
    from app.routes.geofences import geofences_bp
    app.register_blueprint(geofences_bp, url_prefix='/api/geofences')
    
    from app.routes.alerts import alerts_bp
    app.register_blueprint(alerts_bp, url_prefix='/api/alerts')
    
    print("All routes registered:")
    for rule in app.url_map.iter_rules():
        print(f"Route: {rule.rule}, Methods: {rule.methods}")
        
    # Create database tables 
    with app.app_context():
        try:
            db.create_all()
            print("Database tables created successfully")
        except Exception as e:
            print(f"Error creating database tables: {e}")
    
    @app.route('/')
    def index():
        return {"message": "Welcome to Asset Tracker API"}, 200
    
    return app


print(f"Finished import of {__name__}")