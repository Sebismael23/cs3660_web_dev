// Enhanced Geofencing_alerts
import React, { useState } from 'react';
import Header from '../layouts/Header';
import { motion } from "framer-motion";
import { Bell, Plus, Shield, Map, Settings, AlertTriangle } from 'lucide-react';

// Mock data
const mockGeofences = [
  { id: 1, name: "Warehouse Zone", type: "inclusion", radius: "500m", assets: ["Delivery Van 1", "Company Car"], status: "active" },
  { id: 2, name: "Downtown Restricted", type: "exclusion", radius: "2km", assets: ["All Delivery Vans"], status: "active" },
  { id: 3, name: "Construction Site", type: "inclusion", radius: "300m", assets: ["Medical Drone"], status: "paused" },
];

const mockAlerts = [
  { id: 1, asset: "Delivery Van 1", type: "geofence-exit", zone: "Warehouse Zone", time: "Today, 14:32", status: "new" },
  { id: 2, asset: "Medical Drone", type: "low-battery", zone: "Hospital Route", time: "Today, 12:15", status: "acknowledged" },
  { id: 3, asset: "Company Car", type: "geofence-enter", zone: "Downtown Restricted", time: "Yesterday, 18:45", status: "resolved" },
];

const Geofencing_alerts = () => {
  const [activeTab, setActiveTab] = useState('geofences');
  
  return (
    <div className='tw-flex-1 tw-overflow-auto tw-relative tw-z-10'>
      <Header title="Geofencing & Alerts" />
      
      <main className='max-w-7xl tw-mx-auto tw-py-6 tw-px-4 tw-lg:px-8 tw-xl:px-20'>
        {/* Tab Navigation */}
        <motion.div 
          className="tw-flex tw-border-b tw-border-gray-700 tw-mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            className={`tw-px-4 tw-py-2 tw-font-medium tw-flex tw-items-center ${activeTab === 'geofences' ? 'tw-text-blue-400 tw-border-b-2 tw-border-blue-400' : 'tw-text-gray-400'}`}
            onClick={() => setActiveTab('geofences')}
          >
            <Map size={18} className="tw-mr-2" />
            Geofences
          </button>
          <button 
            className={`tw-px-4 tw-py-2 tw-font-medium tw-flex tw-items-center ${activeTab === 'alerts' ? 'tw-text-blue-400 tw-border-b-2 tw-border-blue-400' : 'tw-text-gray-400'}`}
            onClick={() => setActiveTab('alerts')}
          >
            <Bell size={18} className="tw-mr-2" />
            Alerts
            <span className="tw-ml-2 tw-bg-red-500 tw-text-white tw-rounded-full tw-text-xs tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center">
              {mockAlerts.filter(alert => alert.status === 'new').length}
            </span>
          </button>
        </motion.div>
        
        {/* Action Button */}
        <motion.div 
          className="tw-flex tw-justify-end tw-mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {activeTab === 'geofences' && (
            <button className="tw-flex tw-items-center tw-bg-blue-600 tw-text-white tw-rounded-lg tw-px-4 tw-py-2">
              <Plus size={18} className="tw-mr-2" /> Create Geofence
            </button>
          )}
          {activeTab === 'alerts' && (
            <button className="tw-flex tw-items-center tw-bg-blue-600 tw-text-white tw-rounded-lg tw-px-4 tw-py-2">
              <Settings size={18} className="tw-mr-2" /> Configure Alerts
            </button>
          )}
        </motion.div>
        
        {/* Geofences Tab Content */}
        {activeTab === 'geofences' && (
          <motion.div
            className="tw-bg-gray-400 tw-bg-opacity-50 tw-backdrop-blur-md tw-shadow-lg tw-rounded-xl tw-p-6 tw-border tw-border-gray-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="tw-font-medium tw-mb-4 tw-text-gray-100">Active Geofences</h2>
            
            <div className="tw-space-y-4">
              {mockGeofences.map(geofence => (
                <div key={geofence.id} className="tw-bg-gray-700 tw-bg-opacity-50 tw-rounded-lg tw-p-4 tw-border tw-border-gray-600">
                  <div className="tw-flex tw-justify-between tw-items-center">
                    <div className="tw-flex tw-items-center">
                      <Shield size={20} className="tw-mr-3 tw-text-blue-400" />
                      <div>
                        <h3 className="tw-font-medium tw-text-gray-100">{geofence.name}</h3>
                        <div className="tw-text-sm tw-text-gray-400">
                          {geofence.type === 'inclusion' ? 'Keep assets inside' : 'Keep assets outside'} • {geofence.radius} radius
                        </div>
                      </div>
                    </div>
                    
                    <div className="tw-flex tw-items-center">
                      <span className={`tw-px-2 tw-py-1 tw-rounded tw-text-xs ${geofence.status === 'active' ? 'tw-bg-green-900 tw-bg-opacity-30 tw-text-green-400' : 'tw-bg-yellow-900 tw-bg-opacity-30 tw-text-yellow-400'}`}>
                        {geofence.status}
                      </span>
                      <button className="tw-ml-3 tw-p-1 tw-rounded-full tw-bg-gray-600 tw-bg-opacity-50">
                        <Settings size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="tw-mt-3 tw-text-sm tw-text-gray-400">
                    <strong>Assets:</strong> {geofence.assets.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Alerts Tab Content */}
        {activeTab === 'alerts' && (
          <motion.div
            className="tw-bg-gray-400 tw-bg-opacity-50 tw-backdrop-blur-md tw-shadow-lg tw-rounded-xl tw-p-6 tw-border tw-border-gray-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="tw-font-medium tw-mb-4 tw-text-gray-100">Recent Alerts</h2>
            
            <div className="tw-space-y-4">
              {mockAlerts.map(alert => (
                <div key={alert.id} className={`tw-bg-gray-700 tw-bg-opacity-50 tw-rounded-lg tw-p-4 tw-border ${alert.status === 'new' ? 'tw-border-red-500' : 'tw-border-gray-600'}`}>
                  <div className="tw-flex tw-justify-between tw-items-center">
                    <div className="tw-flex tw-items-center">
                      <AlertTriangle size={20} className={`tw-mr-3 ${alert.status === 'new' ? 'tw-text-red-500' : alert.status === 'acknowledged' ? 'tw-text-yellow-500' : 'tw-text-gray-400'}`} />
                      <div>
                        <h3 className="tw-font-medium tw-text-gray-100">{alert.asset}</h3>
                        <div className="tw-text-sm tw-text-gray-400">
                          {alert.type === 'geofence-exit' ? 'Left geofence zone' : 
                           alert.type === 'geofence-enter' ? 'Entered restricted zone' : 
                           'Low battery warning'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="tw-flex tw-items-center">
                      <span className="tw-text-xs tw-text-gray-400">{alert.time}</span>
                      <div className="tw-ml-3 tw-flex tw-space-x-2">
                        {alert.status === 'new' && (
                          <>
                            <button className="tw-px-2 tw-py-1 tw-bg-blue-600 tw-text-white tw-rounded tw-text-xs">
                              Acknowledge
                            </button>
                            <button className="tw-px-2 tw-py-1 tw-bg-green-600 tw-text-white tw-rounded tw-text-xs">
                              Resolve
                            </button>
                          </>
                        )}
                        {alert.status === 'acknowledged' && (
                          <button className="tw-px-2 tw-py-1 tw-bg-green-600 tw-text-white tw-rounded tw-text-xs">
                            Resolve
                          </button>
                        )}
                        {alert.status === 'resolved' && (
                          <span className="tw-px-2 tw-py-1 tw-bg-gray-600 tw-text-gray-300 tw-rounded tw-text-xs">
                            Resolved
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="tw-mt-3 tw-text-sm tw-text-gray-400">
                    <strong>Zone:</strong> {alert.zone}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Geofencing_alerts;