// import React from 'react'
import {motion} from "framer-motion"

const Stat = ({name, icon:Icon , value, color}) => {
  return (
    <motion.div
    className='tw-bg-gray-800 tw-bg-opacity-35 tw-backdrop-blur-md tw-overflow-hidden tw-shadow-lg tw-rounded-xl tw-border tw-border-gray'
      whileHover={{y: -5, boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.5)"}}
    >
      <div className="tw-px-4 tw-py-5 tw-sm:p-5">
        <span className='tw-flex tw-items-center tw-text-sm tw-font-medium tw-text-white'>
          <Icon
            size={20}
            className="mr-2"
            style={{color}}
          />
          {name}
        </span>
        <p className='tw-mt-1 tw-text-2xl tw-font-semibold tw-text-gray-100'>{value}</p>
      </div>
    </motion.div>
  )
};

export default Stat;
