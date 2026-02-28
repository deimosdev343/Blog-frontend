"use client";

import { useAppSelector } from "@/lib/store";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

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
  const [following, setFollowing] = useState<boolean>(false);

  const followUser = async () => {
    try {
      const res = await axios.post(
        `/api/follow`, 
        {user_id: user_id}
      )
      setFollowing(true);      
    } catch (err) {
      console.log(err);
    }
  }

  const unfollowUser = async () => {
    try {
      const res = await axios.delete(
        `/api/follow?user_id=${user_id}`, 
      )
      setFollowing(false);      
    } catch (err) {
      console.log(err);
    }
  }
  const fetchFollowStatus = async () => {
    try {
    if(!user.loggedIn || user.username == username) {
      return setFollowing(false);
    }
    const res = await axios.get(`/api/follow?user_id=${user_id}`);
    setFollowing(res.data.is_following);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchFollowStatus();
  }, [user.loggedIn]);


  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-3 md:p-8 border border-gray-200">
        <div className="flex items-center gap-6">
          <div 
            className="relative w-10 h-10 md:w-24 md:h-15 rounded-4xl
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
          <div className="flex gap-2 items-center justify-center p-2 ">
            <h1 className="text-md md:text-3xl font-semibold ">
              {username}
            </h1>
            <span className="text-gray-500 md:text-sm md:mt-1">
              @{username.toLowerCase()}
            </span>
          </div>
          <div className="w-full flex justify-end-safe md:p-5 md:mt-2  ">
            {user.loggedIn && user.username !== username &&  
              !following 
                ?<button 
                  className=" inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border hover:bg-slate-100
                    border-[#2f54a5] text-black font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all"
                  onClick={() => {
                    followUser();
                  }}
                >
                  Follow
                  <FaPlusCircle/>
                </button> 
                :<button
                  className=" inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border hover:bg-slate-100
                    border-[#2f54a5] text-black font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all"
                  onClick={() => {
                    unfollowUser();

                  }}
                >
                  Unfollow
                  <FaMinusCircle/>
                </button>
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
