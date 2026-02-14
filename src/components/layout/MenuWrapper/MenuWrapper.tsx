import RecommendSearchBar from '@/components/layout/RecommendSearchBar/RecommendSearchBar'
import SideBar from '@/components/layout/SideBar/SideBar'
import React from 'react'

const MenuWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='w-full h-screen flex'>
      <SideBar/>
      <div className='w-full md:w-[60%] h-screen overflow-scroll'>
        {children}
      </div>
      <RecommendSearchBar/>
    </div>
  )
}

export default MenuWrapper