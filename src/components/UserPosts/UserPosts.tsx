"use client"

import { Post } from '@/types/postTypes';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const LIMIT = 10;

const UserPosts = ({user_id} : {user_id: string}) => {
  const [PostFetchState, setPostFetchState] = useState({
    skip: 0,
    loading: false,
    hasMore: true
  })
  const [posts, setPosts] = useState<Post[]>([]);
  
  const fetchPosts = async () => {
    if (PostFetchState.loading || !PostFetchState.hasMore) return;
    setPostFetchState(st => ({...st, loading: true}));
    const res = await axios.get(
      `/api/users/posts?skip=${PostFetchState.skip}&limit=${LIMIT}`,
      {
        params: {
          user_id
        }
      }
    );
    const newPosts = res.data;
    if (newPosts.length < LIMIT) {
      setPostFetchState(st => ({...st, hasMore: false}));
    }
    setPosts(prev => [...prev, ...newPosts]);
    setPostFetchState(st => ({...st, skip: st.skip + LIMIT, loading: false}));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>

    </div>
  )
}

export default UserPosts