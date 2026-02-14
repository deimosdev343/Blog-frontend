import RecommendSearchBar from '@/components/layout/RecommendSearchBar/RecommendSearchBar'
import SideBar from '@/components/layout/SideBar/SideBar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='w-full h-screen flex'>
      <SideBar/>
      <div className="w-full md:w-[64%] h-screen">
        {children}
      </div>
      <RecommendSearchBar/>
    </div>
  )
}

export default layout