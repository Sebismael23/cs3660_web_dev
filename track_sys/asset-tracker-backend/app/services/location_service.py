# app/services/location_service.py
import math
from app import db
from app.models.asset import Asset
from app.models.geofence import Geofence
from app.models.alert import Alert

class LocationService:
    @staticmethod
    def update_asset_location(asset_id, lat, lng):
        """Update an asset's location and check for geofence violations"""
        asset = Asset.query.get(asset_id)
        
        if not asset:
            return False, "Asset not found"
        
        # Update location
        asset.lat = lat
        asset.lng = lng
        
        # Check for geofence violations
        geofences = Geofence.query.filter_by(user_id=asset.user_id, status='active').all()
        
        for geofence in geofences:
            # distance between point and geofence center
            distance = LocationService._calculate_distance(
                lat, lng, 
                geofence.center_lat, geofence.center_lng
            )
            
            # Check if inside or outside the geofence
            is_inside = distance <= geofence.radius
            
            # Handle inclusion/exclusion geofences
            if geofence.type == 'inclusion' and not is_inside:
                # Asset left an inclusion zone
                LocationService._create_geofence_alert(asset, geofence, 'exit')
            
            elif geofence.type == 'exclusion' and is_inside:
                # Asset entered an exclusion zone
                LocationService._create_geofence_alert(asset, geofence, 'enter')
        
        db.session.commit()
        return True, "Location updated successfully"
    
    @staticmethod
    def _calculate_distance(lat1, lon1, lat2, lon2):
        """Calculate distance between two points in meters using Haversine formula"""
        # Convert latitude and longitude from degrees to radians
        lat1_rad = math.radians(lat1)
        lon1_rad = math.radians(lon1)
        lat2_rad = math.radians(lat2)
        lon2_rad = math.radians(lon2)
        
        # Haversine formula
        dlon = lon2_rad - lon1_rad
        dlat = lat2_rad - lat1_rad
        a = math.sin(dlat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon/2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        
        # Radius of Earth in meters
        radius = 6371000
        
        # Calculate the distance
        distance = radius * c
        
        return distance
    
    @staticmethod
    def _create_geofence_alert(asset, geofence, violation_type):
        """Create a geofence alert"""
        if violation_type == 'exit':
            message = f"Asset '{asset.name}' has exited geofence '{geofence.name}'"
            alert_type = 'geofence-exit'
        else:
            message = f"Asset '{asset.name}' has entered geofence '{geofence.name}'"
            alert_type = 'geofence-enter'
        
        alert = Alert(
            type=alert_type,
            message=message,
            status='new',
            asset_id=asset.id,
            geofence_id=geofence.id
        )
        
        db.session.add(alert)