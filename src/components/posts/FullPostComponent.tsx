import { Post } from '@/types/postTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DefaultAvatar from '../../static/user.png';

type PostCardProps = {
  id: number
  title: string
  content: string,
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

const FullPostComponent = ({id,username,title,content,avatarUrl,user_id}:PostCardProps) => {
  return (
    <div 
      className="w-full p-5 flex flex-col "
    >
      <div className='flex flex-col items-center p-2 border-b '>
        <div className='w-full flex items-center'>
          <Link href={`/profilePage/${user_id}`} 
            className="flex items-center gap-3 w-full">

            <Image
              src={(avatarUrl && isValidUrl(avatarUrl)) ? avatarUrl : DefaultAvatar}
              width={40}
              height={40}
              alt="avatar"
              className="w-11 h-11 rounded-full object-cover border"
            />

            <p className="font-semibold text-gray-800 text-lg hover:underline">
              {username}
            </p>

          </Link>
        </div>
        <div className='w-full flex items-center mt-2'>
          <p className='text-4xl text-black font-extrabold'>{title}</p>
        </div>
      </div>
    </div>
  )
}

export default FullPostComponent