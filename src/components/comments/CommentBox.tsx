"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import CreateCommentModal from './modals/CreateCommentModal'
import { Comment } from '@/types/commenyTypes'

type CommentBoxProps = {
  post_id: number
}
const LIMIT = 10;

const CommentBox = ({post_id} : CommentBoxProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [addCommentModalShow, setAddCommentModalShow] = useState(false);
  const [fetchParams, setFetchParams] = useState({
    skip: 0,
    hasMore: true
  });
  console.log(comments)

  const fetchComments = async (skip: number) => {
    try {

      const res = await axios.get("/api/comment", {
        params:{
          post_id,
          skip: skip,
          limit: LIMIT
        }
      });
      if(res.data?.comments?.length < LIMIT) {
        setFetchParams(fp => ({...fp, hasMore: false}));
      }

      const newComments: Comment[] = res.data.comments;
      setComments((prev: Comment[]) => {
        let filterLookup: {[key: number]: number} = {};
        prev.slice(prev.length - 11, prev.length -1).forEach(com => {
          filterLookup[com.id] = com.id
        });
        const filtered = newComments.filter(com => !filterLookup[com.id]);
        return [...prev, ...filtered];
      });
    } catch (err) {
      console.log(err)
    }
  }

  const loadMore = () => {
    fetchComments(fetchParams.skip + LIMIT);
    setFetchParams(fp => ({...fp, skip: fp.skip + LIMIT}));
  }
  useEffect(() => {
    fetchComments(fetchParams.skip);
  }, []);
  
  return (
    <div className='w-full flex flex-col gap-3 p-1 h-full' id="scroll">
      <CreateCommentModal
        post_id={post_id}
        isOpen={addCommentModalShow}
        onClose={() => {
          setAddCommentModalShow(false);
        }}
        onCommentCreated={() => {
          fetchComments(fetchParams.skip);
        }}
      />
      <button 
        className='w-1/6  border border-slate-400/50 font-semibold text-md flex justify-center  gap-2 items-center p-2 
          shadow-md rounded-lg hover:bg-slate-100/50 transition-all duration-300'
        onClick={() => {setAddCommentModalShow(true)}}
      >
        <p>Add Comment</p>
        <FaPlusCircle/>
      </button>
   
      <div className='flex flex-col items-center w-full gap-2 p-1'>
        {comments?.map(comment => <CommentCard
          comment={comment}
        />)}

      </div>
    </div>
  )
}

export default CommentBox