import React from 'react'
import Sidebar from './Sidebar'
import Prompt from './Prompt'
export const Home = () => {
  return (
    <div >
        {/* Sidebar */}
        <div className='w-64 bg-[#232327]'><Sidebar/></div>
        {/* Prompt */}
        <div className='flex-1 flex items-center justify-center px-6'><Prompt/></div>
    </div>
  )
}
