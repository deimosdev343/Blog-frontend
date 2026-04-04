"use client";
import React, { useState } from 'react';
import axios from 'axios';

type CreateCommentModalProps = {
  post_id: number;
  isOpen: boolean;
  onClose: () => void;
  onCommentCreated: () => void;
};




const CreateCommentModal = ({
  post_id, 
  isOpen, 
  onClose, 
  onCommentCreated
} : CreateCommentModalProps) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('Comment cannot be empty.');
      return setTimeout(() => {
        setError("");
      }, 3000);
    }
    
    try {
      setLoading(true);
      await axios.post('/api/comment', {post_id, content});
      setContent("");
      onCommentCreated();
      onClose();
    } catch (err) {
      setError("Message failed to send");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  if (!isOpen) return null;

  return (
    <div 
      className='fixed flex inset-0 z-50 items-center justify-center bg-black/40'
      onClick={() => onClose()}
    >
      <div 
        className='bg-white rounded-lg shadow-md w-[50%] p-4 flex flex-col gap-4'
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Add a Comment</h2>

        <textarea
          className="w-full border rounded-lg p-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          placeholder="Write your comment..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateCommentModal