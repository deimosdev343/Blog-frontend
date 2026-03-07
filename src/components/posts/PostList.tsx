"use client";

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard';
import {Post} from '../../types/postTypes'
import InfiniteScroll from "react-infinite-scroll-component";

const LIMIT = 10;

type PostListProps = {
  posts: Array<Post>,
  fetchPosts: () => void,
  hasMore: boolean
}

const PostList = ({posts, fetchPosts, hasMore} : PostListProps) => {
  
  return (
      <>
        <InfiniteScroll
          next={fetchPosts}
          hasMore={hasMore}
          loader={<div className='flex w-full items-center'>
            <p>Loading More Posts...</p>
          </div>}
          dataLength={posts.length -1}
          scrollableTarget="scrollable"
          className='w-full h-full flex flex-col items-center gap-2 p-5'
        >
          {posts.map((pst,index) => <PostCard 
            key={index}
            avatarUrl={pst.user_avatar}
            previewText={pst.content}
            title={pst.title}
            id={pst.id}
            username={pst.username}
            user_id={pst.author_id}
            upvotes={pst.upvotes}
            downvotes={pst.downvotes}
          />)}

        </InfiniteScroll>
        
      </>

  )
}

export default PostList