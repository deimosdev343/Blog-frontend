import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { BiLogIn } from 'react-icons/bi';
type registerForm = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

type ApiResponseError = {
  msg: string
}

const page = () => {
  const {register, handleSubmit, formState, setError, watch} = useForm<registerForm>();
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const onSubmit = async (data: registerForm) => {
    try {
      const res = await axios.post(`/api/auth/register`, {
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

  const password = watch("password");
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
              Username Required
            </h2>}
          </div>
          <div className='w-[60%] flex flex-col items-center'>
            <p className='font-bold text-xl '>Email</p>
            <input 

              {...register("email", { required: true })}
              className='border p-2 rounded-md w-full' 
            />
            {formState.errors.username?.type === "required" && <h2 className='text-red-500 font-semibold text-lg'>
              Email Required
            </h2>}
          </div>
          <div className='w-[60%] flex flex-col items-center'>
            <p className='font-bold text-xl'>
              Password
            </p>
            {formState.errors.password?.type === "required" && <h2 className='text-red-500 font-semibold text-lg'>
              Password Required
            </h2>}
            <input
              className='border p-2 rounded-md w-full' 
              type="password" 
              {...register("password", { required: true })} 
            />
          </div>
          <div className='w-[60%] flex flex-col items-center'>
            <p className='font-bold text-xl'>
              Confirm Password
            </p>
            {formState.errors.confirmPassword?.type === "required" && <h2 className='text-red-500 font-semibold text-lg'>
              Password Required
            </h2>}
            <input
              className='border p-2 rounded-md w-full' 
              type="password" 
              {...register("confirmPassword", { 
                required: true,
                validate: (value) => {
                  return value == password || "Passwords do not match"
                }
              })} 
            />
          </div>
          <button 
            disabled={formState.isSubmitting}
            className='flex p-2 rounded gap-2 border cursor-pointer hover:bg-slate-200 transition-all duration-200'  
          >
            <BiLogIn size={25}/>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default page