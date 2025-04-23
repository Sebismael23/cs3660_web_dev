// Modified part of your Assets_management.jsx
import React, { useState, useEffect } from 'react'
import Header from '../layouts/Header'
import { motion } from "framer-motion"
import MapComponent from './MapComponent'
import { Search, Plus, Filter } from 'lucide-react'
import AssetCard from './AssetCard'
import { assetService } from '../services/api'

const Assets_management = () => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch assets from backend
  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      const { success, data, error } = await assetService.getAssets();
      if (success) {
        setAssets(data);
      } else {
        setError(error || 'Failed to load assets');
      }
      setLoading(false);
    };
    
    fetchAssets();
  }, []);
  
  // Filter assets based on search and filter
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         asset.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || asset.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Handle asset creation
  const handleAddAsset = async () => {
    // This would typically open a modal with a form
    // For simplicity, we're using a basic object
    const newAsset = {
      name: "New Asset",
      type: "equipment",
      status: "active",
      lat: 40.7128,
      lng: -74.0060
    };
    
    const { success, data } = await assetService.createAsset(newAsset);
    if (success) {
      setAssets([...assets, data.asset]);
    }
  };

  // Rest of your component code...
  
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
            <button 
              className='tw-flex tw-items-center tw-bg-blue-600 tw-text-white tw-rounded-lg tw-px-4 tw-py-2'
              onClick={handleAddAsset}
            >
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
            <h2 className="tw-lg tw-font-medium tw-mb-4 tw-text-gray-100">
              Assets ({filteredAssets.length})
              {loading && <span className="tw-ml-2">(Loading...)</span>}
            </h2>
            
            {error && (
              <div className="tw-bg-red-500 tw-bg-opacity-20 tw-text-red-300 tw-p-3 tw-rounded-lg tw-mb-4">
                {error}
              </div>
            )}
            
            <div className="tw-space-y-4 tw-max-h-80 tw-overflow-y-auto">
              {filteredAssets.length > 0 ? (
                filteredAssets.map(asset => (
                  <AssetCard 
                    key={asset.id} 
                    asset={asset} 
                    onDelete={async (id) => {
                      await assetService.deleteAsset(id);
                      setAssets(assets.filter(a => a.id !== id));
                    }}
                    onStatusChange={async (id, status) => {
                      const { success } = await assetService.updateAsset(id, { status });
                      if (success) {
                        setAssets(assets.map(a => a.id === id ? {...a, status} : a));
                      }
                    }}
                  />
                ))
              ) : (
                <p className="tw-text-gray-300 tw-text-center tw-py-4">
                  {loading ? 'Loading assets...' : 'No assets match your criteria'}
                </p>
              )}
            </div>
          </motion.div>

          {/* Map */}
          <MapComponent assets={filteredAssets} />
        </div>
      </main>
    </div>
  )
}

export default Assets_management