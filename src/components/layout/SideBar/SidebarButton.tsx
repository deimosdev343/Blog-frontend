"use client";

import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'

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
      onClick={() => onClickFunc?.()}
      className="group flex items-center gap-4 px-4 py-3 w-full rounded-2xl
        bg-white/70 backdrop-blur-sm hover:bg-[#2f54a5] border border-gray-200
        hover:border-transparent shadow-sm hover:shadow-lg transition-all duration-300"
    >

      {/* ICON */}
      <div className="
        flex items-center justify-center
        w-10 h-10 rounded-xl
        bg-indigo-100
        group-hover:bg-white/20
        transition-all duration-300
      ">
        <IconComp
          size={20}
          className="
            text-[#2f54a5]
            group-hover:text-white
            transition-all duration-300
          "
        />
      </div>

      {/* TEXT */}
      <span className="
        font-semibold text-gray-700
        group-hover:text-white
        text-lg
        transition-all duration-300
      ">
        {btnTitle}
      </span>

    </Link>
  )
}

export default SidebarButton