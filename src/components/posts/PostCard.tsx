import React from 'react'
import DefaultAvatar from '../../static/user.png';
import Image from 'next/image';
import { FaCircleArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import PostVoteRatio from './PostVoteRatio';

type PostCardProps = {
  id: number
  title: string
  previewText: string,
  username: string,
  avatarUrl?: string,
  user_id: number,
  upvotes?: number,
  downvotes?: number
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const PostCard = ({
    id,
    username,
    title,
    previewText,
    avatarUrl,
    user_id,
    upvotes,
    downvotes
  }:PostCardProps) => {

  return (
    <article className=" group relative w-full bg-white/80 backdrop-blur-sm rounded-3xl
      shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col gap-3
      border border-gray-200"
    >
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
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        {title}
      </h2>
      <div className="relative">

        <div className=" max-h-[160px] md:max-h-[220px] overflow-hidden">
          <div
            dangerouslySetInnerHTML={{__html: previewText.slice(0,500)}}
          />

        </div>
        <div className=" pointer-events-none absolute bottom-0 left-0 right-0 h-16
          bg-gradient-to-t from-white to-transparent" 
        />
      </div>
      <div className='w-full flex items-center p-2 justify-between'>
        <div className="p-1 w-[30%]">
          <Link
            href={`/post/${id}`}
            className=" inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border hover:bg-slate-100
            border-[#2f54a5] text-black font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all"
          >
            Go to post
            <FaCircleArrowRight />
          </Link>
        </div>
        {upvotes != undefined && downvotes != undefined && 
          <div className='w-[30%] flex flex-col items-start gap-2'>
            <p className='text-sm font-semibold'>Likes: {upvotes}</p>
            <p className='text-sm font-semibold'>dislikes: {downvotes}</p>

            <PostVoteRatio upvotes={upvotes} downvotes={downvotes}/>
          </div>
        }
      </div>

    </article>
  )
}

export default PostCard