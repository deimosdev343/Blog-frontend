import React from 'react'
import SidebarButton from './SidebarButton'
import { FaHome } from 'react-icons/fa'

const SideBar = () => {
  return (
    <div className='h-full w-[15%] hidden md:flex flex-col p-2 gap-2 items-center border-r-2 bg-gray-100 border-slate-200'>
      <div className='w-full flex items-center justify-center border-b-2 border-gray-500 p-2'>
        <h2 className='text-black font-bold text-2xl'>Blogger</h2>

      </div>
      <SidebarButton
        IconComp={FaHome}
        btnTitle='Home Page'
        linkTo='/'
      />
      <SidebarButton
        IconComp={FaHome}
        btnTitle='Home Page'
        linkTo='/'
      />

    </div>
  )
}

export default SideBar