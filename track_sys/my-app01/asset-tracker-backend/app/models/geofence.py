# app/models/geofence.py
from datetime import datetime
from app import db

class Geofence(db.Model):
    __tablename__ = 'geofences'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(20), nullable=False)  # 'inclusion' or 'exclusion'
    center_lat = db.Column(db.Float, nullable=False)  # Center latitude
    center_lng = db.Column(db.Float, nullable=False)  # Center longitude
    radius = db.Column(db.Float, nullable=False)  # Radius in meters
    status = db.Column(db.String(20), default='active')  # 'active' or 'paused'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'center_lat': self.center_lat,
            'center_lng': self.center_lng,
            'radius': self.radius,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'user_id': self.user_id
        }