import RecommendSearchBar from "@/components/layout/RecommendSearchBar/RecommendSearchBar";
import SideBar from "@/components/layout/SideBar/SideBar";
import PostList from "@/components/posts/PostList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex bg-white w-full h-screen">
      <SideBar/>
      <div className="w-[64%] h-screen">
        <PostList/>
      </div>
      <RecommendSearchBar/>
    </div>
  );
}
