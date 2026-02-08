import RTEditor from '@/components/Editor/RTEditor'
import React from 'react'

const page = () => {
  return (
    <div className='w-[60%] h-screen overflow-scroll'>
      <RTEditor  onSave={(content) => {console.log(content)}}/>
    </div>
  )
}

export default page