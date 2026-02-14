import Image from "next/image";
import React from 'react'

type UserProfileData =  {
  username: string;
  avatar_url?: string;
  descrption: string;
}

const UserProfileComponent = ({username, avatar_url, descrption}: UserProfileData) => {  
  const avatarValid = avatar_url &&
    (avatar_url.startsWith("http://") ||
    avatar_url.startsWith("https://") ||
    avatar_url.startsWith("/"));

  
  
  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center gap-6">
          <div 
            className="relative w-24 h-24 rounded-full
              overflow-hidden bg-gray-100"
          >
            {avatarValid ? (<Image
              src={avatar_url!}
              alt={username}
              fill
              className="object-cover"
            />) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-semibold text-gray-500">
                {username[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold leading-tight">
              {username}
            </h1>

            <span className="text-gray-500 text-sm mt-1">
              @{username.toLowerCase()}
            </span>
          </div>
        </div>
        <div className="my-6 border-t"/>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-[15px]">
          {descrption || "No description provided."}
        </p>
    </div>
  )
}

export default UserProfileComponent
