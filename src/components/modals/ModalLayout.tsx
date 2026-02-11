import React, { ReactNode } from 'react'

const ModalLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        {children}
      </div>
      <div 
        className='absolute z-[-10] bg-black w-full h-screen'
        style={{opacity:0.5}}    
      />
    </div>
  )
}

export default ModalLayout