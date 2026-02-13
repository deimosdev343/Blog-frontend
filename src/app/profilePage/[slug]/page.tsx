import React from 'react'

type PageProps = {
  params: {
    slug: string
  }
}


const page = async ({params}: PageProps) => {
  const slug = (await params).slug;
  console.log(slug)
  return (
    <div className='w-full h-screen flex flex-col'>

    </div>
  )
}

export default page