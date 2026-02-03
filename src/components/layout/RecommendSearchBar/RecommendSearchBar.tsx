"use client";

import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { FaSearch } from 'react-icons/fa'

const RecommendSearchBar = () => {
  const [searchState, setSearchState] = useState({
    searchTerm:""
  })
  return (
    <div className='h-full w-[22%] hidden md:flex flex-col p-2 gap-2 items-center border-l-2 bg-gray-100 border-slate-200'>
      <SearchBar 
        Icon={FaSearch}
        onChange={(text) => {
          setSearchState({searchTerm: text  })
        }}
        value={searchState.searchTerm}
        placeholder='Search Posts...'
      />
    </div>
  )
}

export default RecommendSearchBar