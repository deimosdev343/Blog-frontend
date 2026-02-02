import RecommendSearchBar from "@/components/layout/RecommendSearchBar";
import SideBar from "@/components/layout/SideBar/SideBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex bg-white w-full h-screen">
      <SideBar/>
      <div className="w-[64%] h-screen">
      </div>
      <RecommendSearchBar/>
    </div>
  );
}
