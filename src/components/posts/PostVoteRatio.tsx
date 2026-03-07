import React from 'react'

type VoteBarProps = {
  upvotes: number
  downvotes: number
}

const PostVoteRatio = ({ upvotes, downvotes }: VoteBarProps) => {
  const total = upvotes + downvotes

  const upRatio = total === 0 ? 1 : (upvotes / total) * 100
  const downRatio = total === 0 ? 1 : (downvotes / total) * 100

  return (
    <div className="relative w-[25%] h-3 rounded overflow-hidden flex">
      <div
        className="bg-green-500 transition-all"
        style={{ width: `${upRatio}%` }}
      />
      <div
        className="bg-red-500 transition-all"
        style={{ width: `${downRatio}%` }}
      />
    </div>
  )
}

export default PostVoteRatio