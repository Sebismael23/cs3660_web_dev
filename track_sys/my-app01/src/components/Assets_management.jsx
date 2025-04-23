// Enhanced Assets_management.jsx
import React, { useState } from 'react'
import Header from '../layouts/Header'
import { motion } from "framer-motion"
import MapComponent from './MapComponent'
import { Search, Plus, Filter } from 'lucide-react'
import AssetCard from './AssetCard' 

// Sample data 
const mockAssets = [
  { id: 1, name: "Delivery Van 1", type: "van", status: "active", location: "Warehouse A", lastUpdate: "10 min ago" },
  { id: 2, name: "Medical Drone", type: "drone", status: "idle", location: "Hospital Route", lastUpdate: "25 min ago" },
  { id: 3, name: "Company Car", type: "car", status: "offline", location: "Downtown", lastUpdate: "2 hours ago" },
  { id: 4, name: "Delivery Van 2", type: "van", status: "active", location: "Route 66", lastUpdate: "5 min ago" },
  { id: 5, name: "Security Drone", type: "drone", status: "active", location: "HQ Perimeter", lastUpdate: "Just now" },
];

const Assets_management = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Filter assets based on search and filter
  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         asset.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || asset.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className='tw-flex-1 tw-overflow-auto tw-relative tw-z-10'>
      <Header title="Assets Management" />

      <main className='max-w-7xl tw-mx-auto tw-py-6 tw-px-4 tw-lg:px-8 tw-xl:px-20'>
        {/* Action buttons */}
        <motion.div
          className='tw-flex tw-flex-wrap tw-justify-between tw-mb-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Search bar */}
          <div className='tw-relative tw-mb-4 sm:tw-mb-0 tw-w-full sm:tw-w-auto'>
            <input
              type="text"
              placeholder="Search assets..."
              className='tw-pl-10 tw-pr-4 tw-py-2 tw-bg-gray-700 tw-bg-opacity-50 tw-rounded-lg tw-text-gray-100 tw-w-full sm:tw-w-64'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className='tw-absolute tw-left-3 tw-top-2.5 tw-text-gray-400' size={18} />
          </div>

          <div className='tw-flex tw-space-x-3'>
            {/* Filter dropdown */}
            <div className='tw-relative'>
              <select 
                className='tw-pl-10 tw-pr-4 tw-py-2 tw-bg-gray-700 tw-bg-opacity-50 tw-rounded-lg tw-text-gray-100'
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="idle">Idle</option>
                <option value="offline">Offline</option>
              </select>
              <Filter className='tw-absolute tw-left-3 tw-top-2.5 tw-text-gray-400' size={18} />
            </div>

            {/* Add asset button */}
            <button className='tw-flex tw-items-center tw-bg-blue-600 tw-text-white tw-rounded-lg tw-px-4 tw-py-2'>
              <Plus size={18} className='tw-mr-2' /> Add Asset
            </button>
          </div>
        </motion.div>

        {/* Assets grid and map */}
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8">
          {/* Asset cards */}
          <motion.div
            className='tw-bg-gray-400 tw-bg-opacity-50 tw-backdrop-blur-md tw-shadow-lg tw-rounded-xl tw-p-6 tw-border tw-border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="tw-lg tw-font-medium tw-mb-4 tw-text-gray-100">Assets ({filteredAssets.length})</h2>
            
            <div className="tw-space-y-4 tw-max-h-80 tw-overflow-y-auto">
              {filteredAssets.length > 0 ? (
                filteredAssets.map(asset => (
                  <AssetCard key={asset.id} asset={asset} />
                ))
              ) : (
                <p className="tw-text-gray-300 tw-text-center tw-py-4">No assets match your criteria</p>
              )}
            </div>
          </motion.div>

          {/* Map */}
          <MapComponent assets={mockAssets} />
        </div>
      </main>
    </div>
  )
}

export default Assets_management