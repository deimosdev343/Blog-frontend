import React from 'react'
import { IconType } from 'react-icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  Icon: IconType
};

const SearchBar = ({Icon, value, placeholder, onChange} :SearchInputProps) => {
  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-2 flex items-center text-[#2f54a5] cursor-pointer">
        <Icon color={"#2f54a5"} size={20} className="transition-all duration-300 z-10" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200 shadow-sm py-2 pl-9 pr-3
          text-lg font-semibold placeholder-gray-400 focus:outline-none focus:bg-indigo-50 transition-all duration-300"
      />
    </div>
  )
}

export default SearchBar