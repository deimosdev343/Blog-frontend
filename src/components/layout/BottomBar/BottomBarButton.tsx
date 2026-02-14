import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'

interface sbtnProps {
  linkTo: string,
  IconComp: IconType,
  onClickFunc?: Function
}

const BottomBarButton = ({linkTo, IconComp, onClickFunc} : sbtnProps) => {
  return (
    <Link 
      href={linkTo}
      onClick={() => {
        if(onClickFunc) {
          onClickFunc()
        }
      }}
      className='flex flex-col items-center p-3  gap-2 justify-between  
         rounded-2xl w-[80%] hover:bg-gray-200 transition-all duration-300'
    >
       <div className='flex items-center justify-between w-full'>
        <IconComp color='var(--color-gray-800)' className='w-10' size={20}/>
      </div>
    </Link>
  )
}

export default BottomBarButton