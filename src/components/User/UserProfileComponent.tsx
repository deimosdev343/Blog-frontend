"use client";

import { useAppSelector } from "@/lib/store";
import Image from "next/image";
import React from 'react'

type UserProfileData =  {
  username: string;
  avatar_url?: string;
  descrption: string;
  user_id: string;
}

const UserProfileComponent = ({username, avatar_url, descrption, user_id}: UserProfileData) => {  
  const avatarValid = avatar_url &&
    (avatar_url.startsWith("http://") ||
    avatar_url.startsWith("https://") ||
    avatar_url.startsWith("/"));
  const user = useAppSelector(state => state.userData);
  
  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-3 md:p-8 border border-gray-200">
        <div className="flex items-center gap-6">
          <div 
            className="relative w-10 h-10 md:w-24 md:h-24 rounded-full
              overflow-hidden bg-gray-100"
          >
            {avatarValid ? (<Image
              src={avatar_url!}
              alt={username}
              fill
              className="object-cover"
            />) : (
              <div className="w-full h-full flex items-center justify-center text-md md:text-xl font-semibold text-gray-500">
                {username[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center justify-between ">
            <h1 className="text-md md:text-3xl font-semibold ">
              {username}
            </h1>
            <span className="text-gray-500 md:text-sm ">
              @{username.toLowerCase()}
            </span>
          </div>
          <div className="w-full flex justify-end-safe md:p-5 md:mt-2  ">
            {user.loggedIn && user.username !== username &&  
              <p>this is where login component will be</p>
            }
          </div>
        </div>
        <div className="my-1 md:my-6  border-t"/>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-[15px]">
          {descrption || "No description provided."}
        </p>
    </div>
  )
}

export default UserProfileComponent
