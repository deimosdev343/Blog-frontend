"use client";
import React from 'react'
import BottomBarButton from './BottomBarButton'
import { FaHome, FaSearch } from 'react-icons/fa'
import { IoSearchCircleOutline } from 'react-icons/io5';
import { FaPen, FaPerson, FaPersonRifle } from 'react-icons/fa6';
import { RiProfileLine } from 'react-icons/ri';

const BottomBar = () => {
  return (
    <div className=' flex h-[10%] md:hidden items-center w-full border-gray-100 border-2'>
      <BottomBarButton
        IconComp={FaHome}
        linkTo='/'
      />
      <BottomBarButton
        IconComp={FaSearch}
        linkTo='/'
      />
      <BottomBarButton
        IconComp={RiProfileLine}
        linkTo='/'
      />
      <BottomBarButton
        IconComp={FaPen}
        linkTo='/'
      />
    </div>
  )
}

export default BottomBar