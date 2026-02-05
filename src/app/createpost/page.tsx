import RTEditor from '@/components/Editor/RTEditor'
import Tiptap from '@/components/Editor/Tiptap'
import React from 'react'

const page = () => {
  return (
    <div className='w-[60%] h-screen overflow-scroll'>
      <RTEditor/>
    </div>
  )
}

export default page