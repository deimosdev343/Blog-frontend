"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
      console.log(res);

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchComments();
  }, []);
  
  return (
    <div className='w-full flex flex-col'>
      
    </div>
  )
}

export default CommentBox