import React from 'react'
import Header from '../layouts/Header'
import Stats from '../layouts/Stats'
import {motion} from "framer-motion"
import { Hourglass, LocateOff, TriangleAlert, Zap } from 'lucide-react'
import OverviewChart from './OverviewChart'
import AssetStatusChart from './AssetStatusChart'

const Dashboard = () => {
  return (
    <div className='tw-flex-1 tw-overflow-auto tw-relative tw-z-10'>
      <Header title="Dashboard" />

      <main className='max-w-7xl tw-mx-auto tw-py-6 tw-px-4 tw-lg:px-8 tw-xl:px-20'>
        <motion.div
          className= 'tw-grid tw-grid-cols-1 tw-gap-5 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-mb-8'
            initial= {{opacity: 0, y: 20}}
            animate= {{opacity: 1, y: 0}}
            transition= {{duration: 1}}
          >
            <Stats name="Active Assets" icon={Zap} value='10 out of 17 are in use' color="#6366F1" />
            <Stats name="Assets out of geofence" icon={LocateOff} value='3 assets not in assigned areas' color="#FFA500" />
            <Stats name="Average Usage time" icon={Hourglass} value='Average use of 4.3 hours today' color="#10B981" />
            <Stats name="Recent Alerts" icon={TriangleAlert} value='1 unauthorized movements' color="#FFFF00" />

        </motion.div>

        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8">
          <OverviewChart />
          <AssetStatusChart />

        </div>
      </main>
    </div>
  )
}

export default Dashboard
