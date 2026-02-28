"use client";

import React, { useEffect, useRef, useState } from 'react'
import {Post} from '../../types/postTypes'
import axios from 'axios';
import PostList from './PostList';

const LIMIT = 5;

const AllPostsBox = () => {
  const [PostFetchState, setPostFetchState] = useState({
    skip: 0,
    loading: false,
    hasMore: true
  })
  const [posts, setPosts] = useState<Post[]>([]);
  
  const fetchPosts = async () => {
    if (PostFetchState.loading || !PostFetchState.hasMore) return;
    setPostFetchState(st => ({...st, loading: true}));
    const res = await axios.get(`/api/post?skip=${PostFetchState.skip}&limit=${LIMIT}`);
    if (res.data < LIMIT) {
      setPostFetchState(st => ({...st, hasMore: false}));
    }
    const newPosts: Array<Post> = res.data;
    setPosts(prev => {
      let filterLookup: {[key: number]: number} = {};
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
    <PostList 
      posts={posts}
      fetchPosts={fetchPosts}
      hasMore={PostFetchState.hasMore}
    />
  )
}

export default AllPostsBox