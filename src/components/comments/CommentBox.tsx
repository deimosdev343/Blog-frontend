"use client"

import React, { useEffect, useState } from 'react'

type CommentBoxProps = {
  post_id: number
}

const CommentBox = ({post_id} : CommentBoxProps) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <div className='w-full flex flex-col'>
      
    </div>
  )
}

export default CommentBox