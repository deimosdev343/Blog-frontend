import MenuWrapper from "@/components/layout/MenuWrapper/MenuWrapper";
import RecommendSearchBar from "@/components/layout/RecommendSearchBar/RecommendSearchBar";
import SideBar from "@/components/layout/SideBar/SideBar";
import AllPostsBox from "@/components/posts/AllPostsBox";
import PostList from "@/components/posts/PostList";
import Image from "next/image";

export default function Home() {
  return (
    <MenuWrapper>
      <AllPostsBox/>
      
    </MenuWrapper>
  );
}
