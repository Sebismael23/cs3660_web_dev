// Simplified Settings.jsx
import React, { useState } from 'react';
import Header from '../layouts/Header';
import { motion } from "framer-motion";
import { User, Bell, Shield, Moon, Save, Globe } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);
  
  return (
    <div className='tw-flex-1 tw-overflow-auto tw-relative tw-z-10'>
      <Header title="Settings" />
      
      <main className='max-w-7xl tw-mx-auto tw-py-6 tw-px-4 tw-lg:px-8 tw-xl:px-20'>
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-4 tw-gap-6">
          {/* Sidebar */}
          <motion.div
            className="tw-bg-gray-700 tw-bg-opacity-50 tw-backdrop-blur-md tw-shadow-lg tw-rounded-xl tw-p-4 tw-border tw-border-gray-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="tw-font-medium tw-mb-4 tw-text-gray-100">Settings</h2>
            
            <nav className="tw-space-y-1">
              <button 
                className={`tw-flex tw-items-center tw-w-full tw-px-3 tw-py-2 tw-rounded-lg tw-text-left ${
                  activeTab === 'profile' ? 'tw-bg-blue-600 tw-text-white' : 'tw-text-gray-300 tw-hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} className="tw-mr-3" />
                Profile
              </button>
              
              <button 
                className={`tw-flex tw-items-center tw-w-full tw-px-3 tw-py-2 tw-rounded-lg tw-text-left ${
                  activeTab === 'notifications' ? 'tw-bg-blue-600 tw-text-white' : 'tw-text-gray-300 tw-hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={18} className="tw-mr-3" />
                Notifications
              </button>
              
              <button 
                className={`tw-flex tw-items-center tw-w-full tw-px-3 tw-py-2 tw-rounded-lg tw-text-left ${
                  activeTab === 'security' ? 'tw-bg-blue-600 tw-text-white' : 'tw-text-gray-300 tw-hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab('security')}
              >
                <Shield size={18} className="tw-mr-3" />
                Security
              </button>
              
              <button 
                className={`tw-flex tw-items-center tw-w-full tw-px-3 tw-py-2 tw-rounded-lg tw-text-left ${
                  activeTab === 'appearance' ? 'tw-bg-blue-600 tw-text-white' : 'tw-text-gray-300 tw-hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab('appearance')}
              >
                <Moon size={18} className="tw-mr-3" />
                Appearance
              </button>
            </nav>
          </motion.div>
          
          {/* Content Area */}
          <motion.div
            className="tw-bg-gray-700 tw-bg-opacity-50 tw-backdrop-blur-md tw-shadow-lg tw-rounded-xl tw-p-5 tw-border tw-border-gray-600 lg:tw-col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={activeTab}
          >
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="tw-text-xl tw-font-medium tw-mb-5 tw-text-gray-100">User Profile</h2>
                
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
                  <div>
                    <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-300 tw-mb-2">
                      Name
                    </label>
                    <input 
                      type="text" 
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-600 tw-rounded-lg tw-px-4 tw-py-2 tw-text-gray-100"
                      defaultValue="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-300 tw-mb-2">
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-600 tw-rounded-lg tw-px-4 tw-py-2 tw-text-gray-100"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-300 tw-mb-2">
                      Job Title
                    </label>
                    <input 
                      type="text" 
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-600 tw-rounded-lg tw-px-4 tw-py-2 tw-text-gray-100"
                      defaultValue="Fleet Manager"
                    />
                  </div>
                  
                  <div>
                    <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-300 tw-mb-2">
                      Department
                    </label>
                    <select className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-600 tw-rounded-lg tw-px-4 tw-py-2 tw-text-gray-100">
                      <option>Operations</option>
                      <option>Logistics</option>
                      <option>Administration</option>
                      <option>IT</option>
                    </select>
                  </div>
                </div>
                
                <div className="tw-mt-6">
                  <button className="tw-flex tw-items-center tw-bg-blue-600 tw-text-white tw-rounded-lg tw-px-4 tw-py-2">
                    <Save size={18} className="tw-mr-2" /> Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="tw-text-xl tw-font-medium tw-mb-5 tw-text-gray-100">Notifications</h2>
                
                <div className="tw-space-y-4">
                  <div className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-bg-gray-800 tw-rounded-lg">
                    <div>
                      <h4 className="tw-font-medium tw-text-gray-100">Email Alerts</h4>
                      <p className="tw-text-sm tw-text-gray-400">Receive alerts via email</p>
                    </div>
                    <label className="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer">
                      <input type="checkbox" className="tw-sr-only tw-peer" defaultChecked />
                      <div className="tw-w-11 tw-h-6 tw-bg-gray-600 tw-rounded-full tw-peer tw-peer-checked:after:translate-x-full tw-peer-checked:after:border-white tw-after:content-[''] tw-after:absolute tw-after:top-0.5 tw-after:left-[2px] tw-after:bg-white tw-after:border-gray-300 tw-after:border tw-after:rounded-full tw-after:h-5 tw-after:w-5 tw-after:transition-all tw-peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-bg-gray-800 tw-rounded-lg">
                    <div>
                      <h4 className="tw-font-medium tw-text-gray-100">Push Notifications</h4>
                      <p className="tw-text-sm tw-text-gray-400">In-app notifications</p>
                    </div>
                    <label className="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer">
                      <input type="checkbox" className="tw-sr-only tw-peer" defaultChecked />
                      <div className="tw-w-11 tw-h-6 tw-bg-gray-600 tw-rounded-full tw-peer tw-peer-checked:after:translate-x-full tw-peer-checked:after:border-white tw-after:content-[''] tw-after:absolute tw-after:top-0.5 tw-after:left-[2px] tw-after:bg-white tw-after:border-gray-300 tw-after:border tw-after:rounded-full tw-after:h-5 tw-after:w-5 tw-after:transition-all tw-peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="tw-mt-5">
                    <h4 className="tw-font-medium tw-text-gray-100 tw-mb-3">Alert Types</h4>
                    
                    <div className="tw-space-y-2">
                      <div className="tw-flex tw-items-center">
                        <input 
                          type="checkbox" 
                          id="geofence_alerts" 
                          className="tw-w-4 tw-h-4 tw-bg-gray-700 tw-border-gray-600 tw-rounded"
                          defaultChecked
                        />
                        <label htmlFor="geofence_alerts" className="tw-ml-2 tw-text-sm tw-text-gray-300">
                          Geofence Violations
                        </label>
                      </div>
                      
                      <div className="tw-flex tw-items-center">
                        <input 
                          type="checkbox" 
                          id="battery_alerts" 
                          className="tw-w-4 tw-h-4 tw-bg-gray-700 tw-border-gray-600 tw-rounded"
                          defaultChecked
                        />
                        <label htmlFor="battery_alerts" className="tw-ml-2 tw-text-sm tw-text-gray-300">
                          Low Battery Warnings
                        </label>
                      </div>
                      
                      <div className="tw-flex tw-items-center">
                        <input 
                          type="checkbox" 
                          id="maintenance_alerts" 
                          className="tw-w-4 tw-h-4 tw-bg-gray-700 tw-border-gray-600 tw-rounded"
                          defaultChecked
                        />
                        <label htmlFor="maintenance_alerts" className="tw-ml-2 tw-text-sm tw-text-gray-300">
                          Maintenance Reminders
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="tw-mt-6">
                    <button className="tw-flex tw-items-center tw-bg-blue-600 tw-text-white tw-rounded-lg tw-px-4 tw-py-2">
                      <Save size={18} className="tw-mr-2" /> Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Security Settings */}
            {activeTab === 'security' && (
              <div>
                <h2 className="tw-text-xl tw-font-medium tw-mb-5 tw-text-gray-100">Security</h2>
                
                <div className="tw-space-y-5">
                  <div>
                    <h3 className="tw-font-medium tw-text-gray-200 tw-mb-3">Change Password</h3>
                    
                    <div className="tw-space-y-3">
                      <input 
                        type="password" 
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-600 tw-rounded-lg tw-px-4 tw-py-2 tw-text-gray-100"
                        placeholder="Current Password"
                      />
                      
                      <input 
                        type="password" 
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-600 tw-rounded-lg tw-px-4 tw-py-2 tw-text-gray-100"
                        placeholder="New Password"
                      />
                      
                      <input 
                        type="password" 
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-600 tw-rounded-lg tw-px-4 tw-py-2 tw-text-gray-100"
                        placeholder="Confirm New Password"
                      />
                    </div>
                  </div>
                  
                  <div className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-bg-gray-800 tw-rounded-lg">
                    <div>
                      <h4 className="tw-font-medium tw-text-gray-100">Two-Factor Authentication</h4>
                      <p className="tw-text-sm tw-text-gray-400">Add extra security to your account</p>
                    </div>
                    <button className="tw-bg-green-600 tw-text-white tw-rounded-lg tw-px-3 tw-py-1 tw-text-sm">
                      Enable
                    </button>
                  </div>
                  
                  <div className="tw-mt-6">
                    <button className="tw-flex tw-items-center tw-bg-blue-600 tw-text-white tw-rounded-lg tw-px-4 tw-py-2">
                      <Save size={18} className="tw-mr-2" /> Update Security
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div>
                <h2 className="tw-text-xl tw-font-medium tw-mb-5 tw-text-gray-100">Appearance</h2>
                
                <div className="tw-space-y-5">
                  <div className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-bg-gray-800 tw-rounded-lg">
                    <div>
                      <h4 className="tw-font-medium tw-text-gray-100">Dark Mode</h4>
                      <p className="tw-text-sm tw-text-gray-400">Use dark theme throughout the app</p>
                    </div>
                    <label className="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="tw-sr-only tw-peer" 
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <div className="tw-w-11 tw-h-6 tw-bg-gray-600 tw-rounded-full tw-peer tw-peer-checked:after:translate-x-full tw-peer-checked:after:border-white tw-after:content-[''] tw-after:absolute tw-after:top-0.5 tw-after:left-[2px] tw-after:bg-white tw-after:border-gray-300 tw-after:border tw-after:rounded-full tw-after:h-5 tw-after:w-5 tw-after:transition-all tw-peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div>
                    <h4 className="tw-font-medium tw-text-gray-200 tw-mb-3">Language</h4>
                    <select className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-600 tw-rounded-lg tw-px-4 tw-py-2 tw-text-gray-100">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="tw-font-medium tw-text-gray-200 tw-mb-3">Time Zone</h4>
                    <select className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-600 tw-rounded-lg tw-px-4 tw-py-2 tw-text-gray-100">
                      <option>Eastern Time (UTC-5)</option>
                      <option>Central Time (UTC-6)</option>
                      <option>Mountain Time (UTC-7)</option>
                      <option>Pacific Time (UTC-8)</option>
                    </select>
                  </div>
                  
                  <div className="tw-mt-6">
                    <button className="tw-flex tw-items-center tw-bg-blue-600 tw-text-white tw-rounded-lg tw-px-4 tw-py-2">
                      <Save size={18} className="tw-mr-2" /> Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Settings;