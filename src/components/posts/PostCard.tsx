import React, { useState } from 'react'
import DefaultAvatar from '../../static/user.png';
import Image from 'next/image';
import { FaCircleArrowRight } from 'react-icons/fa6';
import Link from 'next/link';

type PostCardProps = {
  id: number
  title: string
  previewText: string,
  username: string,
  avatarUrl?: string,
  user_id: number
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const PostCard = ({id,username, title, previewText, avatarUrl, user_id} :PostCardProps) => {
  return (
    <article className='relative w-[90%]  min-h-[45%] bg-white rounded-xl shadow-md p-4 flex flex-col overflow-clip'>
      <Link href={`/profilePage/${user_id}`} className='flex items-center gap-3 mb-2'>
        <Image
          src={(avatarUrl && isValidUrl(avatarUrl)) ? avatarUrl : DefaultAvatar}
          width={10}
          height={10}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className='font-bold text-lg'>{username}</p>
      </Link>
      <h2 className="text-3xl font-semibold text-gray-900">
        {title}
      </h2>  
      <div className='w-full p-5 h-[150px] md:h-[200px] relative overflow-clip'>
        <div 
          className=" overflow-clip"
          dangerouslySetInnerHTML={{__html: previewText.slice(0,500)}}
        />

      </div>
      <div className='w-full flex items-center p-5'>
        <div className='flex items-center gap-2 border hover:bg-gray-100 p-1 rounded-2xl cursor-pointer'>
          <p className='font-bold'>Go To Post</p> 
          <FaCircleArrowRight className="mt-[1px]" />
        </div>
      </div>
    </article>
  )
}

export default PostCard