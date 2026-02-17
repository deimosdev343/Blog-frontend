import DropdownBtn from '@/components/Base/DropdownBtn'
import Link from 'next/link'
import React from 'react'
import { BiPencil } from 'react-icons/bi'
import { FaNoteSticky } from 'react-icons/fa6'

const SideBarCreateButton = () => {
  return (
    <DropdownBtn
      text={"Create"}
      Icon={BiPencil}
      className="
      relative flex items-center gap-4 px-4 py-3 w-full rounded-2xl
      bg-white/70 backdrop-blur-sm
      hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500
      border border-gray-200
      hover:border-transparent
      shadow-sm hover:shadow-lg
      transition-all duration-300
      font-semibold text-gray-700 hover:text-white
      "
    >

      {/* DROPDOWN PANEL */}
      <div className="
        absolute left-0 top-full z-30 mt-3 w-full 
        rounded-2xl 
        bg-white/80 backdrop-blur-xl
        border border-gray-200
        shadow-xl
        overflow-hidden
      ">

        <Link
          href={'/createpost'}
          className="
          flex items-center gap-3 px-4 py-3
          hover:bg-indigo-50
          transition-all
          font-medium text-gray-700
          "
        >
          <BiPencil size={18}/>
          Post
        </Link>

        <Link
          href={'/createpost'}
          className="
          flex items-center gap-3 px-4 py-3
          hover:bg-purple-50
          transition-all
          font-medium text-gray-700
          border-t border-gray-100
          "
        >
          <FaNoteSticky size={16}/>
          Note
        </Link>

      </div>

    </DropdownBtn>
  )
}

export default SideBarCreateButton