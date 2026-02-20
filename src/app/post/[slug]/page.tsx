import { Post } from "@/types/postTypes";
import axios from "axios";

type PageProps = {
  params: {
    slug: string
  }
}


async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await axios.get(`${process.env.BACKEND_API}/posts/${id}`)
    return res.data;
  } catch {
    return null
  }
}

const page = async ({params}: PageProps) => {
  const slug = (await params).slug;
  let post: Post | null = await getPost(slug);

  if(!post) {
    return <div>Post Not Found</div>
  }

  return (
    <div>Post...</div>
  )
}

export default page