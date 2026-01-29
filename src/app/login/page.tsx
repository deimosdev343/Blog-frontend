"use client";

import axios, { AxiosError } from 'axios';
import { NextApiResponse } from 'next';
import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import { BiLogIn } from 'react-icons/bi';
import { FaFlorinSign } from 'react-icons/fa6';

type LoginForm = {
  email: string,
  password: string
}

type ApiResponseError = {
  msg: string
}
const page = () => {

  const {register, handleSubmit, formState, setError} = useForm<LoginForm>();
  const [apiError, setApiError] = useState("");
  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axios.post(`/api/auth/login`, {
       email: data.email,
       password: data.password 
      })
    } catch (err) {
      const axErr = err as AxiosError<ApiResponseError>;
      console.log(axErr.response?.data?.msg);
      if(axErr.response?.data?.msg) setApiError(axErr.response.data.msg)
      setTimeout(() => {
        setApiError("")
      }, 3500);
    }
  }

  console.log(formState.errors)
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-slate-200'>
      <div 
        className='w-[30%] h-[50%] shadow-xl border border-slate-200 bg-white
          rounded-xl flex flex-col justify-center p-5'
      >
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-center gap-4 '>
          <div className='w-[60%] flex flex-col items-center'>
            <p className='font-bold text-xl '>Email</p>
            <input 

              {...register("email", { required: true })}
              className='border p-2 rounded-md w-full' 
            />
            {formState.errors.email?.type === "required" && <h2 className='text-red-500 font-semibold text-lg'>
              email Required
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
            className='flex p-2 rounded gap-2 border '  
          >
            <BiLogIn size={25}/>
            Login
          </button>
          <p className='text-red-500 font-semibold text-lg'>{apiError}</p>
        </form>
      </div>
    </div>
  )
}

export default page