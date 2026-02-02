import React, { ReactNode } from 'react'
import { useState, useRef, useEffect } from "react";
import { IconType } from 'react-icons';

interface dropDownBtnType {
  className: string,
  text: string,
  Icon?: IconType,
  children: ReactNode
}

const DropdownBtn = ({className,text, children, Icon}: dropDownBtnType) => {
  const [open, setOpen] = useState<Boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  console.log(open);

  return (
      <button
        ref={ref}
        onClick={() => setOpen(st => !st)}
        className={className}
      >
        {text}
        {open && children}
        {Icon &&  <Icon size={20} />}
      </button>
    
  )
}

export default DropdownBtn