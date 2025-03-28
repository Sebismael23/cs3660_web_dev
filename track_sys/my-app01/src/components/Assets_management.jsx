import React from 'react'
import Header from '../layouts/Header'
import Stats from '../layouts/Stats'
import {motion} from "framer-motion"
import { Hourglass, LocateOff, TriangleAlert, Zap } from 'lucide-react'
import OverviewChart from './OverviewChart'
import AssetStatusChart from './AssetStatusChart'
import MapComponent from './MapComponent'

const Assets_management = () => {
  return (
    <div className='tw-flex-1 tw-overflow-auto tw-relative tw-z-10'>
      <Header title="Assets Management" />

      <main className='max-w-7xl tw-mx-auto tw-py-6 tw-px-4 tw-lg:px-8 tw-xl:px-20'>
        <motion.div
          className= 'tw-grid tw-grid-cols-1 tw-gap-5 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-mb-8'
            initial= {{opacity: 0, y: 20}}
            animate= {{opacity: 1, y: 0}}
            transition= {{duration: 1}}
          >
            
        </motion.div>

        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8">
          <MapComponent />

        </div>
      </main>
    </div>
  )
}

export default Assets_management
