import React from 'react'

type commentProp = {
  author_id: number,
  content: string,
  created_at: string,
  id: number,
  post_id: number,
  updated_at: string,
  user_avatar: string | null,
  username: string
}

const CommentCard = ({comment} :{comment: commentProp}) => {

  return (
    <article className=" group relative w-full bg-white/80 backdrop-blur-sm rounded-lg
      shadow-md  transition-all duration-300 p-6 flex flex-col gap-3 border border-gray-200"
    >
      Test
    </article>
  )
}

export default CommentCard