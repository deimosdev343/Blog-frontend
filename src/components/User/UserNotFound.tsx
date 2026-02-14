"use client"
import { FaUserSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Props = {
  message?: string;
  showBackButton?: boolean;
};

export default function UserNotFound({
  message = "The user you are looking for does not exist.",
  showBackButton = true,
}: Props) {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-center py-20 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center text-center max-w-md w-full">
        <div className="bg-gray-100 rounded-full p-6 mb-6">
          <FaUserSlash size={48} className="text-gray-500" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          User not found
        </h2> 
        <p className="text-gray-500 mb-6">
          {message}
        </p>
        {showBackButton && (
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl bg-black 
            font-bold text-white hover:opacity-85 transition"
          >
            Go back
          </button>
        )}
      </div>
    </div>
  );
}