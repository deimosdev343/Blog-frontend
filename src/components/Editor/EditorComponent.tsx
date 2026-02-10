"use client";

import React from 'react'
import RTEditor from './RTEditor'

const EditorComponent = () => {
  
  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <RTEditor  onSave={(title, content) => {console.log(content)}}/>
    </div>
  )
}

export default EditorComponent