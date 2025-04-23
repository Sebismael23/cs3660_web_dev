# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from config.config import config_dict

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config_dict[config_name])
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)
    
    # Register blueprints
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    from app.routes.assets import assets_bp
    app.register_blueprint(assets_bp, url_prefix='/api/assets')
    
    from app.routes.geofences import geofences_bp
    app.register_blueprint(geofences_bp, url_prefix='/api/geofences')
    
    from app.routes.alerts import alerts_bp
    app.register_blueprint(alerts_bp, url_prefix='/api/alerts')
    
    # Create database tables (if do not exist)
    with app.app_context():
        db.create_all()
    
    return app