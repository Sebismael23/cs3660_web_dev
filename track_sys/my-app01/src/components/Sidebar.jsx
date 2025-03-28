import React, { useState } from 'react'
import {BarChart2, Menu, Settings, ShoppingBag, FileChartLine, LocateFixed, Radio} from 'lucide-react';
import {AnimatePresence, motion} from "framer-motion";
import { Link } from 'react-router-dom';

const SIDEBAR_ITEMS =[
    {
        name: "Dashboard", icon:BarChart2, color:"#6366f1", href:"/admin/dashboard"
    },
    {name: "Assets Management", icon: Radio, color:"#Ffa500", href:"/admin/assets_management"},
    {name: "Geofencing & alerts", icon: LocateFixed, color:"#Ff0000", href:"/admin/geofencing_alerts"},
    {name: "Reports & Analytics", icon: FileChartLine, color:"#ffb6c1", href:"/admin/reports_Analytics"},
    {name: "Settings", icon: Settings, color:"#10B981", href:"/admin/settings"},
]

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div className = {`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 tw-h-screen tw-overflow-hidden ${
        isSidebarOpen ? 'tw-w-64' : 'tw-w-20'
    }`}
    animate = {{width: isSidebarOpen ? 256 : 80 }}
    >
        {/* <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-m p-4 flex flex-col border-r border-gray-700"> */}
        <div className='tw-h-full tw-bg-gray-800 tw-bg-opacity-35 tw-backdrop-blur-md tw-p-4 tw-flex tw-flex-col tw-border-r tw-border-gray-700 '>
            <motion.button 
                whileHover = {{scale: 1.1}}
                whileTap= {{ scale: 0.9}}
                onClick = {() => setIsSidebarOpen(!isSidebarOpen)}
                // className = 'p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
                className = 'tw-p-2 tw-rounded-full tw-hover:bg-gray-700 tw-transition-colors tw-max-w-fit'
            >
                <Menu size={24}/>
            </motion.button>
            
            <nav className='tw-mt-8 tw-flex-grow'>
                {SIDEBAR_ITEMS.map((item) => (
                    <Link key={item.href} to = {item.href}>
                        <motion.div
                        className='tw-flex tw-items-center tw-p-4 tw-text-sm tw-font-medium tw-rounded-lg tw-hover:bg-gray-700 tw-transition-colors tw-mb-2 tw-text-gray-100 '>
                            <item.icon size={20} style={{color: item.color, minWidth:"20"}} />

                            <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                className='tw-ml-4 tw-whitespace-nowrap'
                                initial={{opacity:0 , width: 0}}
                                animate = {{opacity:1, width: "auto"}}
                                exit={{opacity: 0, width: 0}}
                                transition={{duration:0.2, delay:0.3}}
                                >
                                    {item.name}
                                </motion.span>
                            ) }
                                
                            </AnimatePresence>
                        </motion.div>
                    </Link>
                ))}
            </nav>
        </div>

    </motion.div>
  )
}

export default Sidebar