"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'

type CommentBoxProps = {
  post_id: number
}

const CommentBox = ({post_id} : CommentBoxProps) => {
  const [comments, setComments] = useState([]);

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
    <div className='w-full flex flex-col'>
      {comments.map(comment => <CommentCard
        comment={comment}
      />)}
    </div>
  )
}

export default CommentBox