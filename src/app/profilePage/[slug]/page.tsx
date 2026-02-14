import UserNotFound from '@/components/User/UserNotFound'
import UserProfileComponent from '@/components/User/UserProfileComponent'
import axios from 'axios'
type PageProps = {
  params: {
    slug: string
  }
}


const page = async ({params}: PageProps) => {
  const slug = (await params).slug;
  let userData: any;
  const getUserData = async () => {
    try {
      const res = await axios.get(`${process.env.BACKEND_API}/user/${slug}`);
      userData  = res.data;
    } catch (err) {
      console.log(err)
    }
  }
  await getUserData();
  

  if(!userData) {
    return <div className='w-full flex flex-col items-center justify-center'>
      <UserNotFound showBackButton={true}/>
    </div>
  }
  if(userData){
    return (
      <div className='w-full h-screen flex flex-col p-2 py-5'>
        <UserProfileComponent
          username={userData.username}
          descrption={userData.descrption}
          avatar_url={userData.avatar_url}
        />
      </div>
    )
  }
}

export default page