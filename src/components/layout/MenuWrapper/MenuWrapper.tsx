import RecommendSearchBar from '@/components/layout/RecommendSearchBar/RecommendSearchBar'
import SideBar from '@/components/layout/SideBar/SideBar'
import React from 'react'
import BottomBar from '../BottomBar/BottomBar'

const MenuWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='w-full h-screen flex'>
      <SideBar/>
      
      <div className='w-full md:w-[70%] h-full overflow-clip'>
        <div className='w-full  h-[90%] md:h-full overflow-scroll ' id="scrollable">
          {children}
        </div>
        <BottomBar/>
      </div>
      <RecommendSearchBar/>
    </div>
  )
}

export default MenuWrapper