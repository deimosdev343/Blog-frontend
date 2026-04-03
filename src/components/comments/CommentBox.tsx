"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'

type CommentBoxProps = {
  post_id: number
}

const CommentBox = ({post_id} : CommentBoxProps) => {
  const [comments, setComments] = useState([]);
  const [addCommentModalShow, setAddCommentModalShow] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await axios.get("/api/comment", {
        params:{
          post_id,
          skip: 0,
          limit: 10
        }
      })
      setComments(res.data.comments);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);
  
  return (
    <div className='w-full flex flex-col gap-3 p-1'>
      <button 
        className='w-1/6  border border-slate-400/50 font-semibold text-md flex justify-center  gap-2 items-center p-2 
          shadow-md rounded-lg hover:bg-slate-100/50 transition-all duration-300'
        
      >
        <p>Add Comment</p>
        <FaPlusCircle/>
      </button>
      {comments.map(comment => <CommentCard
        comment={comment}
      />)}
    </div>
  )
}

export default CommentBox