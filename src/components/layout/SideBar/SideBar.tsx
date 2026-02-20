"use client";

import React from 'react'
import SidebarButton from './SidebarButton'
import { FaHome, FaUsers } from 'react-icons/fa'
import { LuBookMarked, LuLogOut, LuSettings } from 'react-icons/lu'
import { CiSettings } from 'react-icons/ci'
import { logoutUser, useAppDispatch, useAppSelector } from '@/lib/store';
import { BiLogIn, BiPencil } from 'react-icons/bi';
import { FaNoteSticky } from 'react-icons/fa6';
import axios from 'axios';
import DropdownBtn from '../../Base/DropdownBtn';
import Link from 'next/link';
import SideBarCreateButton from './SideBarCreateButton';

const SideBar = () => {
  const user = useAppSelector(state => state.userData);
  const dispatch = useAppDispatch();
  const logout = async () => {
    console.log('enter')
    try {
      const res = await axios.get(`/api/auth/logout`);
      dispatch(logoutUser());
    } catch (err) {
      console.log(err);
    }    
  }
  return (
  <div className="h-screen w-65 hidden md:flex flex-col p-4 gap-3 
  bg-linear-to-b from-indigo-50 via-white to-white 
  border-r border-gray-200 shadow-sm">
    <div className="w-full flex items-center justify-center pb-4 mb-2 border-b border-gray-200">
      <h2 className="font-extrabold text-3xl  bg-[#2f54a5] text-transparent bg-clip-text">
        Blogger
      </h2>
    </div>
    <SidebarButton IconComp={FaHome} btnTitle='Home Page' linkTo='/' />
    <SidebarButton IconComp={FaNoteSticky} btnTitle='My Posts' linkTo='/' />
    <SidebarButton IconComp={FaUsers} btnTitle='Following' linkTo='/' />
    <SidebarButton IconComp={LuBookMarked} btnTitle='Bookmarks' linkTo='/' />
    <SidebarButton IconComp={LuSettings} btnTitle='Settings' linkTo='/' />

    {user.loggedIn && (
      <SidebarButton
        IconComp={LuLogOut}
        btnTitle='Logout'
        linkTo='/'
        onClickFunc={logout}
      />
    )}

    {!user.loggedIn && (
      <SidebarButton IconComp={BiLogIn} btnTitle='Login' linkTo='/login'/>
    )}

    {user.loggedIn && <div className='w-full flex items-center justify-center'>
      <SideBarCreateButton/>
    </div>}

  </div>
  )
}

export default SideBar