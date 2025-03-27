// import React from 'react'

const Header = ({title}) => {
  return (
    <header className='tw-bg-gray-400 tw-bg-opacity-35 tw-backdrop-blur-md tw-shadow-lg tw-border-b tw-border-gray-700 '>
        <div className='tw-max-w-7xl tw-mx-auto tw-py-4 tw-px-4 sm:tw-px-6 lg:tw-px-8'>
            <h1 className='tw-text-2xl tw-font-semibold tw-text-gray-100'>{title}</h1>
        </div>
      
    </header>
  )
}

export default Header
