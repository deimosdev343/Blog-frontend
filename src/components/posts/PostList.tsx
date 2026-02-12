"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';
import {Post} from '../../types/postTypes'
const PostList = () => {
  const fetchPosts = async () => {
    const res = await axios.get('/api/post');
    setPosts(res.data);
  }
  
  const [posts, setPosts] = useState<Post[]>([]);
  console.log(posts);
  useEffect(() => {
    fetchPosts();
  }, [])
  return (
    <div className='w-full h-full flex flex-col items-center gap-2 overflow-scroll'>
      {posts.map(pst => <PostCard 
        key={pst.id}
        avatarUrl={pst.user_avatar}
        previewText={pst.content}
        title={pst.title}
        id={pst.id}
        username={pst.username}
      />)}
    </div>
  )
}

export default PostList