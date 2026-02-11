"use client";

import React, { useState } from 'react'
import RTEditor from './RTEditor'
import SuccessModal from '../modals/SuccessModal'
import axios from 'axios';

const EditorComponent = () => {
  const [err, setErr] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSave = async (title: string, content: string) => {
    try {
      await axios.post(`/api/post`, {
        title,
        content
      });
      setShowSuccessModal(true);
    } catch (err) {
      console.log(err);
      setErr("Internal Server Error");
      setTimeout(() => {
        setErr("")
      }, 3000)
    }
  }

  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <RTEditor onSave={onSave}/>
      <div className='w-full flex p-1 items-center'>
        <p className=''>{err}</p>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        title="Post Created!"
        message="Your post has been saved successfully."
        onClose={() => setShowSuccessModal(false)}
        autoCloseDuration={3000}
      />
    </div>
  )
}

export default EditorComponent