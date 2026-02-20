import FullPostComponent from "@/components/posts/FullPostComponent";
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

  console.log(post);
  if(!post) {
    return <div>Post Not Found</div>
  }

  return (
    <div className="w-full h-full flex flex-col">
      <FullPostComponent 
        title={post.title}
        content={post.content}
        username={post.username}
        id={post.id}
        avatarUrl={post.user_avatar}
        user_id={post.author_id}
      />
    </div>
  )
}

export default page