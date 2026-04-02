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
    <div>CommentCard</div>
  )
}

export default CommentCard