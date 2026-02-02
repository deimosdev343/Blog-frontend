import RecommendSearchBar from "@/components/layout/RecommendSearchBar";
import SideBar from "@/components/layout/SideBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex bg-slate-700 w-full h-screen">
      <SideBar/>
      <div className="w-[64%] h-screen">
      </div>
      <RecommendSearchBar/>
    </div>
  );
}
