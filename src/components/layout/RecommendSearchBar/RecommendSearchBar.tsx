"use client";

import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { FaSearch } from 'react-icons/fa'

const RecommendSearchBar = () => {
  const [searchState, setSearchState] = useState({
    searchTerm:""
  })
  return (
    <div className="h-screen w-[25%] hidden md:flex flex-col p-4 gap-3 
      bg-linear-to-b from-indigo-50 via-white to-white 
      border-r border-gray-200 shadow-sm">
      <div className="w-full flex items-center justify-center pb-4 mb-2 border-b border-gray-200">
        <h2 className="font-extrabold text-2xl bg-[#2f54a5] text-transparent bg-clip-text">
          Search
        </h2>
      </div>
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