"use client";

import { loginUser, useAppDispatch } from '@/lib/store';
import axios, { AxiosError } from 'axios';
import { NextApiResponse } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import { BiLogIn } from 'react-icons/bi';
import { FaFlorinSign } from 'react-icons/fa6';


type LoginForm = {
  username: string,
  password: string
}

type ApiResponseError = {
  msg: string
}
const page = () => {
  const dispatch = useAppDispatch()
  const {register, handleSubmit, formState, setError} = useForm<LoginForm>();
  const [apiError, setApiError] = useState("");
  const router = useRouter()
  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axios.post(`/api/auth/login`, {
       username: data.username,
       password: data.password 
      })
      dispatch(loginUser(res.data.user_data));
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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-center gap-4 '>
          <div className='w-[60%] flex flex-col items-center'>
            <p className='font-bold text-xl '>Username</p>
            <input 

              {...register("username", { required: true })}
              className='border p-2 rounded-md w-full' 
            />
            {formState.errors.username?.type === "required" && <h2 className='text-red-500 font-semibold text-lg'>
              username Required
            </h2>}
          </div>
          <div className='w-[60%] flex flex-col items-center'>
            <p className='font-bold text-xl'>
              Password
            </p>
            {formState.errors.password?.type === "required" && <h2 className='text-red-500 font-semibold text-lg'>
              password Required
            </h2>}
            <input
              className='border p-2 rounded-md w-full' 
              type="password" 
              {...register("password", { required: true })} 
            />
          </div>

          <button 
            disabled={formState.isSubmitting}
            className='flex p-2 rounded gap-2 border cursor-pointer hover:bg-slate-200 transition-all duration-200'  
          >
            <BiLogIn size={25}/>
            <p className='text-md font-bold'>
              Login
            </p>
          </button>
          <p className='text-red-500 font-semibold text-lg'>{apiError}</p>
          <div className='p-2 flex items-center w-full justify-center'>
              <p className='flex gap-1'>Don't have an account? <Link href={'/register'} className='text-blue-500' >Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page