import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
type registerForm = {
  username: string,
  email: string,
  password: string
}

type ApiResponseError = {
  msg: string
}

const page = () => {
  const {register, handleSubmit, formState, setError} = useForm<registerForm>();
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const onSubmit = async (data: registerForm) => {
    try {
      const res = await axios.post(`/api/auth/login`, {
       username: data.username,
       email: data.email,
       password: data.password 
      })
      router.push('/');
    } catch (err) {
      const axErr = err as AxiosError<ApiResponseError>;
      console.log(axErr.response?.data?.msg);
      if(axErr.response?.data?.msg) setApiError(axErr.response.data.msg)
      setTimeout(() => {
        setApiError("")
      }, 3500);
    }
  }
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