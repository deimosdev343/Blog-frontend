import MenuWrapper from '@/components/layout/MenuWrapper/MenuWrapper'
import RecommendSearchBar from '@/components/layout/RecommendSearchBar/RecommendSearchBar'
import SideBar from '@/components/layout/SideBar/SideBar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <MenuWrapper>
      {children}
    </MenuWrapper>
  )
}

export default layout