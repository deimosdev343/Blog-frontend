"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PostList = () => {
  const fetchPosts = async () => {
    const res = await axios.get('/api/post');
    setPosts(res.data);
  }
  
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    fetchPosts();
  }, [])
  return (
    <div className='w-full flex flex-col items-center'>

    </div>
  )
}

export default PostList