import React from 'react'
import { IconType } from 'react-icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  Icon: IconType
};

const SearchBar = () => {
  return (
    <div>SearchBar</div>
  )
}

export default SearchBar