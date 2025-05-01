# app/routes/__init__.py
from app.routes.auth import auth_bp
from app.routes.assets import assets_bp
from app.routes.geofences import geofences_bp
from app.routes.alerts import alerts_bp

# Export all blueprints
__all__ = ['auth_bp', 'assets_bp', 'geofences_bp', 'alerts_bp']