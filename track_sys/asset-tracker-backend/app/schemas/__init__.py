# app/schemas/__init__.py
from flask import Flask
from flask_cors import CORS

from app import db, jwt  # Import from main app package

def create_app(config_name='default'):
    app = Flask(__name__)
    
    # Import config
    from config.config import config_dict
    app.config.from_object(config_dict[config_name])
    
    # Initialize extensions with app
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    
    # Register blueprints
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    from app.routes.assets import assets_bp
    app.register_blueprint(assets_bp, url_prefix='/api/assets')
    
    # Create database tables (if they don't exist)
    with app.app_context():
        db.create_all()
    
    return app