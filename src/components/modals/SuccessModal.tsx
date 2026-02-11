"use client";

import React, { useEffect } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface SuccessModalProps {
  isOpen: boolean;
  isSuccess: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  autoCloseDuration?: number; // in milliseconds
}

const SuccessModal = ({
  isOpen,
  isSuccess,
  title = "Success!",
  message = "Operation completed successfully.",
  onClose,
  autoCloseDuration = 3000,
}: SuccessModalProps) => {
  useEffect(() => {
    if (isOpen && autoCloseDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDuration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center text-center">
         {isSuccess && <>
          <IoCheckmarkCircle size={64} className="text-green-500 mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Close
          </button>
         </>}
         {!isSuccess && <p className='font-bold'>Loading...</p>}
        </div>
      </div>
      <div 
        className='absolute z-[-10] bg-black w-full h-screen'
        style={{opacity:0.5}}    
      >

      </div>
    </div>
  );
};

export default SuccessModal;
