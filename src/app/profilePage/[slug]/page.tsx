import UserNotFound from '@/components/User/UserNotFound'
import axios from 'axios'
import React from 'react'

type PageProps = {
  params: {
    slug: string
  }
}


const page = async ({params}: PageProps) => {
  const slug = (await params).slug;
  let userData = null;
  const getUserData = async () => {
    try {
      const res = await axios.get(`${process.env.BACKEND_API}/user/${slug}`);
      userData = res.data;
    } catch (err) {
      console.log(err)
    }
  }
  await getUserData();
  console.log(userData);

  if(!userData) {
    return <UserNotFound showBackButton={true}/>
  }

  return (
    <div className='w-full h-screen flex flex-col'>

    </div>
  )
}

export default page