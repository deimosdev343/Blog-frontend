import React from 'react'

type VoteBarProps = {
  upvotes: number
  downvotes: number
}

const PostVoteRatio = ({ upvotes, downvotes }: VoteBarProps) => {
  const total = upvotes + downvotes

  const upRatio = total === 0 ? 50 : (upvotes / total) * 100
  const downRatio = total === 0 ? 50 : (downvotes / total) * 100

  return (
    <div className="relative w-full h-3 rounded overflow-hidden flex">
      <div
        className="bg-green-400 transition-all"
        style={{ width: `${upRatio}%` }}
      />
      <div
        className="bg-red-400 transition-all"
        style={{ width: `${downRatio}%` }}
      />
    </div>
  )
}

export default PostVoteRatio