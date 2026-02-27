"use client"

import { Post } from '@/types/postTypes';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PostList from '../posts/PostList';

const LIMIT = 5;

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
    const newPosts: Array<Post> = res.data;
    if (newPosts.length < LIMIT) {
      setPostFetchState(st => ({...st, hasMore: false}));
    }
    setPosts(prev => {
      let filterLookup: any = {};
      if(prev.length > 10) {
        prev.slice(prev.length - 11, prev.length -1).forEach(p => {
          filterLookup[p.id] = p.id
        })
      } else {
        prev.forEach(p => {
          filterLookup[p.id] = p.id
        })
      }
      const filtered = newPosts.filter(p => !filterLookup[p.id]);
      return [...prev, ...filtered]
    });
    setPostFetchState(st => ({...st, skip: PostFetchState.skip + LIMIT, loading: false}));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='w-full h-full'>
      <PostList
        hasMore={PostFetchState.hasMore}
        fetchPosts={fetchPosts}
        posts={posts}
      />

    </div>
  )
}

export default UserPosts