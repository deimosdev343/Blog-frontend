import React from 'react'
import SidebarButton from './SidebarButton'
import { FaHome } from 'react-icons/fa'

const SideBar = () => {
  return (
    <div className='h-full w-[15%] hidden md:flex flex-col items-center border-r-2 bg-slate-600 border-slate-400'>
      <SidebarButton
        IconComp={FaHome}
        
        btnTitle='Home Page'
        linkTo='/'
      />
    </div>
  )
}

export default SideBar