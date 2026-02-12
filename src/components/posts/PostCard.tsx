import React, { useState } from 'react'
import DefaultAvatar from '../../static/user.png';
import Image from 'next/image';

type PostCardProps = {
  id: number
  title: string
  previewText: string
  avatarUrl?: string
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const PostCard = ({id, title, previewText, avatarUrl} :PostCardProps) => {
  return (
    <article className='w-[60%] bg-white rounded-xl shadow-md p-4'>
      <div className='flex items-center gap-3 mb-2'>
        <Image
          src={(avatarUrl && isValidUrl(avatarUrl)) ? avatarUrl : DefaultAvatar}
          width={10}
          height={10}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </article>
  )
}

export default PostCard