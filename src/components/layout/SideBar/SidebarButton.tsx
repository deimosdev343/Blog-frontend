"use client";

import Link from 'next/link'
import React from 'react'
import { IconBase, IconType } from 'react-icons'

interface sbtnProps {
  linkTo: string,
  IconComp: IconType,
  btnTitle: string
  onClickFunc?: Function
}

const SidebarButton = ({linkTo, IconComp, btnTitle, onClickFunc} : sbtnProps) => {
  return (
    <Link 
      href={linkTo}
      onClick={() => {
        if(onClickFunc) {
          onClickFunc()
        }
      }}
      className='flex flex-col items-center p-3  gap-2 justify-between  
        border-gray-600 rounded-2xl w-[80%] hover:bg-gray-200 transition-all duration-300'
    >
      <div className='flex items-center justify-between w-full'>
        <IconComp color='var(--color-gray-800)' className='w-10' size={20}/>
        <p className='text-xl font-bold text-black'>
          {btnTitle}
        </p>

      </div>
      <div className='w-full border border-dashed border-gray-600 rounded-4xl'></div>
    </Link>
  )
}

export default SidebarButton