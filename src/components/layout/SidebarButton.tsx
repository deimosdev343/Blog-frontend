import Link from 'next/link'
import React from 'react'
import { IconBase, IconType } from 'react-icons'

interface sbtnProps {
  linkTo: string,
  IconComp: IconType,
  btnTitle: string
}

const SidebarButton = ({linkTo, IconComp, btnTitle} : sbtnProps) => {
  return (
    <Link href={linkTo} className='flex items-center p-2 justify-between'>
      <IconComp/>
      <p className='text-md font-bold text-white'>
        {btnTitle}
      </p>
    </Link>
  )
}

export default SidebarButton