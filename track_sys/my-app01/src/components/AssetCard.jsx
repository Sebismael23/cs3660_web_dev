// AssetCard.jsx
import React from 'react'
import { AlertTriangle, Check, Clock, MapPin, Menu, Trash, Edit } from 'lucide-react'

const statusColors = {
  active: "tw-bg-green-500",
  idle: "tw-bg-yellow-500",
  offline: "tw-bg-red-500"
}

const AssetCard = ({ asset, onDelete, onStatusChange }) => {
  const statusColor = statusColors[asset.status] || "tw-bg-gray-500";
  
  // Asset type icons (simplified)
  const getTypeIcon = () => {
    switch(asset.type) {
      case 'van':
        return '🚚';
      case 'car':
        return '🚗';
      case 'drone':
        return '🛩️';
      default:
        return '📦';
    }
  }

  // Status change dropdown handler
  const handleStatusChange = (e) => {
    onStatusChange(asset.id, e.target.value);
  };

  return (
    <div className="tw-bg-gray-700 tw-bg-opacity-50 tw-rounded-lg tw-p-4 tw-relative tw-border tw-border-gray-600 tw-hover:border-blue-500 tw-transition-colors">
      <div className="tw-flex tw-justify-between tw-items-start">
        <div className="tw-flex tw-items-center">
          <span className="tw-text-2xl tw-mr-3">{getTypeIcon()}</span>
          <div>
            <h3 className="tw-font-medium tw-text-gray-100">{asset.name}</h3>
            <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-400">
              <MapPin size={14} className="tw-mr-1" />
              <span>{asset.lat ? `${asset.lat.toFixed(4)}, ${asset.lng.toFixed(4)}` : 'No location'}</span>
            </div>
          </div>
        </div>
        
        <div className="tw-flex tw-items-center">
          <div className={`tw-h-3 tw-w-3 tw-rounded-full ${statusColor} tw-mr-2`}></div>
          <select
            className="tw-text-sm tw-capitalize tw-bg-transparent tw-border-none tw-focus:outline-none"
            value={asset.status}
            onChange={handleStatusChange}
          >
            <option value="active">Active</option>
            <option value="idle">Idle</option>
            <option value="offline">Offline</option>
          </select>
          <button 
            className="tw-ml-4 tw-text-red-400 tw-hover:text-red-300"
            onClick={() => onDelete(asset.id)}
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
      
      <div className="tw-mt-3 tw-text-xs tw-text-gray-400 tw-flex tw-items-center">
        <Clock size={14} className="tw-mr-1" />
        <span>Last updated: {new Date(asset.last_updated).toLocaleString()}</span>
      </div>
    </div>
  )
}

export default AssetCard