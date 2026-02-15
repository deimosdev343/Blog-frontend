"use client";

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard';
import {Post} from '../../types/postTypes'

const LIMIT = 10;


const PostList = () => {
  const [PostFetchState, setPostFetchState] = useState({
    skip: 0,
    loading: false,
    hasMore: true
  })
  const [posts, setPosts] = useState<Post[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const fetchPosts = async () => {
    if (PostFetchState.loading || !PostFetchState.hasMore) return;
    setPostFetchState(st => ({...st, loading: true}));
    const res = await axios.get(`/api/post?skip=${PostFetchState.skip}&limit=${LIMIT}`);
    const newPosts = res.data;
    if (newPosts.length < LIMIT) {
      setPostFetchState(st => ({...st, hasMore: false}));
    }
    setPosts(prev => [...prev, ...newPosts]);
    setPostFetchState(st => ({...st, skip: st.skip + LIMIT, loading: false}));
  };


  // const fetchPosts = async () => {
  //   const res = await axios.get('/api/post');
  //   setPosts(res.data);
  // }  

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='w-full h-full flex flex-col items-center gap-2 overflow-scroll py-2'>
      {posts.map(pst => <PostCard 
        key={pst.id}
        avatarUrl={pst.user_avatar}
        previewText={pst.content}
        title={pst.title}
        id={pst.id}
        username={pst.username}
        user_id={pst.author_id}
      />)}
    </div>
  )
}

export default PostList