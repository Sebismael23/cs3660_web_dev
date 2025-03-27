import React from 'react'
import {motion} from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AssetStatus = [
    { status: "Active", count: 12 },
    { status: "Idle", count: 4 },
    { status: "Offline", count: 2 }
  ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AssetStatusChart = () => {
  return (
    <motion.div
            className='tw-bg-gray-400 tw-bg-opacity-50 tw-backdrop-blur-md tw-shadow-lg  tw-rounded-xl tw-p-6 tw-border tw-border-gray-700'
            initial= {{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            transition={{delay:0.2}}
        >
        <h2 className="tw-lg  tw-font-medium tw-mb-4 tw-text-gray-100">Asset Status</h2>
        <div className="tw-h-80">
            <ResponsiveContainer
                width={"100%"}
                height={"100%"}
            >
                <PieChart>
                <Pie
                    data={AssetStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                    label={({ status, percent})=> `${status} ${(percent * 100).toFixed(0)}%`}
                >
                    {AssetStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip/>
                <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
        </motion.div>
  )
}

export default AssetStatusChart
