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
import DropdownBtn from '../Base/DropdownBtn';

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
    <div className='h-full w-[15%] hidden md:flex flex-col p-2 gap-2 items-center border-r-2 bg-gray-100 border-slate-200'>
      <div className='w-full flex items-center justify-center border-b-2 border-gray-500 p-2'>
        <h2 className='text-black font-bold text-2xl'>Blogger</h2>

      </div>
      <SidebarButton
        IconComp={FaHome}
        btnTitle='Home Page'
        linkTo='/'
      />
      <SidebarButton
        IconComp={FaNoteSticky}
        btnTitle='My Posts'
        linkTo='/'
      />
      <SidebarButton
        IconComp={FaUsers}
        btnTitle='Following'
        linkTo='/'
      />
      <SidebarButton
        IconComp={LuBookMarked}
        btnTitle='Bookmarks'
        linkTo='/'
      />
      <SidebarButton
        IconComp={LuSettings}
        btnTitle='Settings'
        linkTo='/'
      />
      {user.loggedIn && <SidebarButton
        IconComp={LuLogOut}
        btnTitle='Logout'
        linkTo='/'
        onClickFunc={() => {
          console.log("enter")
          logout()
        }}
      />}
      {!user.loggedIn && <SidebarButton
        IconComp={BiLogIn}
        btnTitle='Login'
        linkTo='/login'
      />}
      <DropdownBtn
        className="relative flex w-[80%] justify-between p-2 items-center gap-2 rounded-lg border-gray-800 border 
          text-md font-bold focus:outline-none hover:bg-gray-100"
        text={"Create"}
        icon={BiPencil}

      >
        <div className="absolute left-0 top-full z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5">
          <div className="py-1">
            <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
              Profile
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
              Settings
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      </DropdownBtn>      



    </div>
  )
}

export default SideBar