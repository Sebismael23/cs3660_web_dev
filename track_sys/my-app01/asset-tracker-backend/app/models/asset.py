# app/models/asset.py
from datetime import datetime
from app import db

class Asset(db.Model):
    __tablename__ = 'assets'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # e.g., 'vehicle', 'drone', 'equipment'
    status = db.Column(db.String(20), default='active')  # 'active', 'idle', 'offline'
    lat = db.Column(db.Float, nullable=True)  # Latitude
    lng = db.Column(db.Float, nullable=True)  # Longitude
    last_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'status': self.status,
            'lat': self.lat,
            'lng': self.lng,
            'last_updated': self.last_updated.isoformat() if self.last_updated else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'user_id': self.user_id
        }