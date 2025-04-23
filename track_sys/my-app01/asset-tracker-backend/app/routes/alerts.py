# app/routes/alerts.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import db
from app.models.alert import Alert
from app.models.asset import Asset

alerts_bp = Blueprint('alerts', __name__)

@alerts_bp.route('/', methods=['GET'])
@jwt_required()
def get_alerts():
    """Get all alerts for the logged-in user's assets"""
    user_id = get_jwt_identity()
    