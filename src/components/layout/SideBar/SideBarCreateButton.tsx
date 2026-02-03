import DropdownBtn from '@/components/Base/DropdownBtn'
import Link from 'next/link'
import React from 'react'
import { BiPencil } from 'react-icons/bi'

const SideBarCreateButton = () => {
  return (
    <DropdownBtn
        className="relative flex w-[80%] justify-between p-2 items-center gap-2 rounded-md border-gray-800 border-2 
          text-md font-bold focus:outline-none hover:bg-gray-100 border-dotted"
        text={"Create"}
        Icon={BiPencil}
        

      >
        <div className="absolute left-0 top-full z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5">
          <div className="py-1">
            <Link href={'/createpost'} className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 border-b border-dotted">
              Post
            </Link>
            <Link href={'/createpost'} className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 border-dotted">
              Note
            </Link>
          </div>
        </div>
      </DropdownBtn>   
  )
}

export default SideBarCreateButton