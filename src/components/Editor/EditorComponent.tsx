"use client";

import React, { useState } from 'react'
import RTEditor from './RTEditor'
import axios from 'axios';

const EditorComponent = () => {
  const [err, setErr] = useState("");
  const onSave = async (title: string, content: string) => {
    try {
      axios.post(`/api/post`, {
        title,
        content
      });

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
    </div>
  )
}

export default EditorComponent