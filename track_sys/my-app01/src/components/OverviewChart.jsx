import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {motion} from "framer-motion"

const ActivityTrends = [
    { date: "2025-03-13", movements: 35 },
    { date: "2025-03-14", movements: 40 },
    { date: "2025-03-15", movements: 38 },
    { date: "2025-03-16", movements: 50 },
    { date: "2025-03-17", movements: 45 },
    { date: "2025-03-18", movements: 42 },
    { date: "2025-03-19", movements: 48 }
  ];

import React from 'react'

const OverviewChart = () => {
  return ( 
    <motion.div
        className='tw-bg-gray-400 tw-bg-opacity-50 tw-backdrop-blur-md tw-shadow-lg  tw-rounded-xl tw-p-6 tw-border tw-border-gray-700'
        initial= {{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{delay:0.2}}
    >
        <h2
            className="tw-lg  tw-font-medium tw-mb-4 tw-text-gray-1"
        >Activity trends(last 7 days)</h2>

        <div className="tw-h-80">
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart data={ActivityTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563"/>
                    <XAxis dataKey={"date"}  />
                    <YAxis/>
                    <Tooltip
                        contentStyle={{
                            backgroundColor:"rgba(31, 41, 55, 0.5)",
                            borderColor:"#4B5563",
                        }}
                        itemStyle= {{
                            color: "#E5E7EB"
                        }}
                    />
                        <Line type="monotone" 
                        dataKey="movements" 
                        stroke="#8884d8" 
                        dot={{fill:"#FFFF", strokeWidth:2, r:6}}
                        activeDot={{ r: 8 }} />

                </LineChart>
            </ResponsiveContainer>

        </div>
    </motion.div>
  )
}

export default OverviewChart
