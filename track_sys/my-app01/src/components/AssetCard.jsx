// AssetCard.jsx
import React from 'react'
import { AlertTriangle, Check, Clock, MapPin, Menu } from 'lucide-react'

const statusColors = {
  active: "tw-bg-green-500",
  idle: "tw-bg-yellow-500",
  offline: "tw-bg-red-500"
}

const AssetCard = ({ asset }) => {
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

  return (
    <div className="tw-bg-gray-700 tw-bg-opacity-50 tw-rounded-lg tw-p-4 tw-relative tw-border tw-border-gray-600 tw-hover:border-blue-500 tw-transition-colors">
      <div className="tw-flex tw-justify-between tw-items-start">
        <div className="tw-flex tw-items-center">
          <span className="tw-text-2xl tw-mr-3">{getTypeIcon()}</span>
          <div>
            <h3 className="tw-font-medium tw-text-gray-100">{asset.name}</h3>
            <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-400">
              <MapPin size={14} className="tw-mr-1" />
              <span>{asset.location}</span>
            </div>
          </div>
        </div>
        
        <div className="tw-flex tw-items-center">
          <div className={`tw-h-3 tw-w-3 tw-rounded-full ${statusColor} tw-mr-2`}></div>
          <span className="tw-text-sm tw-capitalize">{asset.status}</span>
          <button className="tw-ml-4 tw-text-gray-400 tw-hover:text-white">
            <Menu size={16} />
          </button>
        </div>
      </div>
      
      <div className="tw-mt-3 tw-text-xs tw-text-gray-400 tw-flex tw-items-center">
        <Clock size={14} className="tw-mr-1" />
        <span>Last updated: {asset.lastUpdate}</span>
      </div>
    </div>
  )
}

export default AssetCard