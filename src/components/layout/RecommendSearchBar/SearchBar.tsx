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
      <div className="absolute inset-y-0 left-2 flex items-center text-gray-400 cursor-pointer">
        <Icon size={25} color='#777'/>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border-2 border-dotted border-gray-500 py-2 pl-9 pr-3 
          text-lg font-bold placeholder-gray-400 focus:outline-none"
      />
    </div>
  )
}

export default SearchBar