import RecommendSearchBar from '@/components/layout/RecommendSearchBar/RecommendSearchBar'
import SideBar from '@/components/layout/SideBar/SideBar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='w-full h-screen flex'>
      <SideBar/>
      {children}
      <RecommendSearchBar/>
    </div>
  )
}

export default layout