import Link from 'next/link'
import React from 'react'
import DefaultAvatar from '../../static/user.png';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Comment } from '@/types/commenyTypes';


function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const CommentCard = ({comment} :{comment: Comment}) => {

  return (
    <article className=" group relative w-full bg-white/80 backdrop-blur-sm rounded-lg
      shadow-md  transition-all duration-300 p-6 flex flex-col gap-3 border border-gray-200"
    >
      <Link 
        href={`/profilePage/${comment.author_id}`} 
        className="flex items-center gap-3 w-full"
      >

        <Image
          src={(comment.user_avatar && isValidUrl(comment.user_avatar)) ? comment.user_avatar : DefaultAvatar}
          width={40}
          height={40}
          alt="avatar"
          className="w-11 h-11 rounded-full object-cover border"
        />

        <p className="font-semibold text-gray-800 text-lg hover:underline">
          {comment.username}
        </p>
      </Link>
      <div className='w-full flex flex-col p-2 gap-2'>
        <p>
          {comment.content}
        </p>
        <p className='text-xs text-gray-400'>{dayjs(comment.created_at).format("DD/MM/YYYY HH:mm")}</p>
      </div>
      
    </article>
  )
}

export default CommentCard