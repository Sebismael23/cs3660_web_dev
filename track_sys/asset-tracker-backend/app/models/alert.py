# app/models/alert.py
from datetime import datetime
from app import db

class Alert(db.Model):
    __tablename__ = 'alerts'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(30), nullable=False)  # 'geofence-exit', 'geofence-enter', 'low-battery', etc.
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='new')  # 'new', 'acknowledged', 'resolved'
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    asset_id = db.Column(db.Integer, db.ForeignKey('assets.id'), nullable=False)
    geofence_id = db.Column(db.Integer, db.ForeignKey('geofences.id'), nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'message': self.message,
            'status': self.status,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'asset_id': self.asset_id,
            'geofence_id': self.geofence_id
        }