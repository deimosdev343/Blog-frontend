import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
type registerForm = {
  username: string,
  email: string,
  password: string
}
const page = () => {
  const {register, handleSubmit, formState, setError} = useForm<registerForm>();
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-slate-200'>
    <div 
        className='w-[70%] md:w-[50%] lg:w-[30%] h-[80%] lg:h-[50%] shadow-xl border border-slate-200 bg-white
          rounded-xl flex flex-col justify-center p-5 overflow-scroll'
      >
        
      </div>
    </div>
  )
}

export default page