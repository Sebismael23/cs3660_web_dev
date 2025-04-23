// Streamlined Reports_Analytics.jsx
import React, { useState } from 'react';
import Header from '../layouts/Header';
import { motion } from "framer-motion";
import { BarChart2, Calendar, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data
const usageData = [
  { date: "2025-04-17", hours: 6.2 },
  { date: "2025-04-18", hours: 7.5 },
  { date: "2025-04-19", hours: 5.8 },
  { date: "2025-04-20", hours: 4.2 },
  { date: "2025-04-21", hours: 8.1 },
  { date: "2025-04-22", hours: 6.7 },
  { date: "2025-04-23", hours: 5.4 },
];

const alertsData = [
  { name: "Geofence Violations", value: 12 },
  { name: "Low Battery", value: 8 },
  { name: "Maintenance Due", value: 5 },
  { name: "Unauthorized Use", value: 3 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Reports_Analytics = () => {
  const [dateRange, setDateRange] = useState('week');
  
  return (
    <div className='tw-flex-1 tw-overflow-auto tw-relative tw-z-10'>
      <Header title="Reports & Analytics" />
      
      <main className='max-w-7xl tw-mx-auto tw-py-6 tw-px-4 tw-lg:px-8 tw-xl:px-20'>
        {/* Date Range Controls */}
        <motion.div
          className="tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="tw-flex tw-space-x-2 tw-mb-3 sm:tw-mb-0">
            <button 
              className={`tw-px-3 tw-py-1 tw-rounded ${dateRange === 'week' ? 'tw-bg-blue-600 tw-text-white' : 'tw-bg-gray-700 tw-text-gray-300'}`}
              onClick={() => setDateRange('week')}
            >
              Week
            </button>
            <button 
              className={`tw-px-3 tw-py-1 tw-rounded ${dateRange === 'month' ? 'tw-bg-blue-600 tw-text-white' : 'tw-bg-gray-700 tw-text-gray-300'}`}
              onClick={() => setDateRange('month')}
            >
              Month
            </button>
            <button 
              className={`tw-px-3 tw-py-1 tw-rounded ${dateRange === 'quarter' ? 'tw-bg-blue-600 tw-text-white' : 'tw-bg-gray-700 tw-text-gray-300'}`}
              onClick={() => setDateRange('quarter')}
            >
              Quarter
            </button>
          </div>
          
          <div className="tw-flex tw-space-x-3">
            <button className="tw-flex tw-items-center tw-bg-gray-700 tw-text-gray-200 tw-rounded-lg tw-px-4 tw-py-2">
              <Calendar size={16} className="tw-mr-2" />
              Custom Range
            </button>
            <button className="tw-flex tw-items-center tw-bg-green-600 tw-text-white tw-rounded-lg tw-px-4 tw-py-2">
              <Download size={16} className="tw-mr-2" />
              Export
            </button>
          </div>
        </motion.div>
        
        {/* Charts */}
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8 tw-mb-8">
          {/* Usage Trends Chart */}
          <motion.div
            className="tw-bg-gray-700 tw-bg-opacity-50 tw-backdrop-blur-md tw-shadow-lg tw-rounded-xl tw-p-6 tw-border tw-border-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="tw-font-medium tw-mb-4 tw-text-gray-100">Asset Usage Trends</h2>
            <div className="tw-h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(31, 41, 55, 0.8)",
                      borderColor: "#4B5563",
                    }}
                    itemStyle={{
                      color: "#E5E7EB"
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    name="Usage Hours"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ fill: "#FFFFFF", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          {/* Alerts by Type */}
          <motion.div
            className="tw-bg-gray-700 tw-bg-opacity-50 tw-backdrop-blur-md tw-shadow-lg tw-rounded-xl tw-p-6 tw-border tw-border-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="tw-font-medium tw-mb-4 tw-text-gray-100">Alerts by Type</h2>
            <div className="tw-h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={alertsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {alertsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
        
        {/* Available Reports */}
        <motion.div
          className="tw-bg-gray-700 tw-bg-opacity-50 tw-backdrop-blur-md tw-shadow-lg tw-rounded-xl tw-p-6 tw-border tw-border-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="tw-font-medium tw-mb-4 tw-text-gray-100">Available Reports</h2>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
            <div className="tw-bg-gray-800 tw-bg-opacity-50 tw-rounded-lg tw-p-4 tw-border tw-border-gray-600">
              <h3 className="tw-font-medium tw-text-gray-100">Monthly Usage Summary</h3>
              <p className="tw-text-sm tw-text-gray-400 tw-mb-3">April 2025</p>
              <button className="tw-flex tw-items-center tw-bg-blue-600 tw-text-white tw-rounded-lg tw-px-3 tw-py-1 tw-text-sm">
                <Download size={14} className="tw-mr-1" /> Download
              </button>
            </div>
            
            <div className="tw-bg-gray-800 tw-bg-opacity-50 tw-rounded-lg tw-p-4 tw-border tw-border-gray-600">
              <h3 className="tw-font-medium tw-text-gray-100">Asset Health Report</h3>
              <p className="tw-text-sm tw-text-gray-400 tw-mb-3">Last updated: April 20, 2025</p>
              <button className="tw-flex tw-items-center tw-bg-blue-600 tw-text-white tw-rounded-lg tw-px-3 tw-py-1 tw-text-sm">
                <Download size={14} className="tw-mr-1" /> Download
              </button>
            </div>
            
            <div className="tw-bg-gray-800 tw-bg-opacity-50 tw-rounded-lg tw-p-4 tw-border tw-border-gray-600">
              <h3 className="tw-font-medium tw-text-gray-100">Geofence Violation Log</h3>
              <p className="tw-text-sm tw-text-gray-400 tw-mb-3">Last quarter</p>
              <button className="tw-flex tw-items-center tw-bg-blue-600 tw-text-white tw-rounded-lg tw-px-3 tw-py-1 tw-text-sm">
                <Download size={14} className="tw-mr-1" /> Download
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Reports_Analytics;