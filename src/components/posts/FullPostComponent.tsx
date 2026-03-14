"use client";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa";

import { Post } from '@/types/postTypes'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DefaultAvatar from '../../static/user.png';
import axios from 'axios';
import PostVoteRatio from './PostVoteRatio';

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


  const onDislike = () => {
    if(voteState.user_votes == -1) {
      setVoteState(voteState => ({...voteState, downvotes: voteState.downvotes -1, user_votes: 0}));
    } else if (voteState.user_votes == 1) {
      setVoteState(voteState => ({...voteState, upvotes: voteState.upvotes -1, downvotes: voteState.downvotes + 1, user_votes: -1}));
    } 
    else {
      setVoteState(voteState => ({...voteState, downvotes: voteState.downvotes +1, user_votes: -1}));
    }
  }

  const onLike = () => {
    if(voteState.user_votes == 1) {
      setVoteState(voteState => ({...voteState, upvotes: voteState.upvotes -1, user_votes: 0}));
    } else if (voteState.user_votes == -1) {
      setVoteState(voteState => ({...voteState, upvotes: voteState.upvotes +1, downvotes: voteState.downvotes -1, user_votes: 1}));
    } else {
      setVoteState(voteState => ({...voteState, upvotes: voteState.upvotes +1, user_votes: 1}));
    }
  }

  const fetchVotes = async () => {
    try {
      const res = await axios.get('/api/vote', {
        params:{
          post_id: id
        }
      });
      setVoteState({
        downvotes: res.data.downvotes || 0,
        upvotes: res.data.upvotes || 0,
        user_votes: res.data.user_votes || 0
      });
      console.log(res);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchVotes();
  }, []);

  const [voteState, setVoteState] = useState({
    downvotes:0,
    upvotes: 0,
    user_votes:0
  });

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
      <div className="relative p-5">
        <div className="max-h-full overflow-scroll ">
          <div
            dangerouslySetInnerHTML={{__html: content}}
          />

        </div>
      </div>
      <div className='w-full flex items-center p-1 justify-end'>
        <div className='w-[28%] flex flex-col '>
          <div className='w-full flex justify-between'>
            <div className={`flex flex-col items-center p-2 ${voteState.user_votes == -1 && "text-red-400"}`}>
              <button 
                className="cursor-pointer"
                onClick={onDislike}
              >
                {voteState.user_votes == -1 ? <FaThumbsDown size={30}/>  : <FaRegThumbsDown size={30}/>}
              </button>
                <p className="text-black font-semibold">Dislikes: {voteState.downvotes}</p>
            </div>
            <div className={`flex flex-col items-center p-2 ${voteState.user_votes == 1 && "text-green-400"}`}>
              <button 
                className="cursor-pointer"
                onClick={onLike}
              >
                {voteState.user_votes == 1 ? <FaThumbsUp size={30}/>  : <FaRegThumbsUp size={30} />}
              </button>
              <p className="text-black font-semibold">Likes: {voteState.upvotes}</p>

            </div>
          </div>
          <PostVoteRatio
            upvotes={voteState.upvotes}
            downvotes={voteState.downvotes}
          />

        </div>
      </div>
    </div>
  )
}

export default FullPostComponent