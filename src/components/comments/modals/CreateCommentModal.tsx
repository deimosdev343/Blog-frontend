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

  if (!isOpen) return null;

  return (
    <div 
      className='fixed inset-0 z-50 items-center justify-center bg-black/40'
      onClick={() => onClose()}
    >
      <div 
        className='bg-white rounded-lg shadow-md w-[60%] p-4 flex flex-col gap-4'
        onClick={e => e.stopPropagation()}
      >
        <h2>Test</h2>
      </div>
    </div>
  )
}

export default CreateCommentModal