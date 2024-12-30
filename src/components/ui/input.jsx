import React from 'react';

export function Input(props) {
  return (
    <input 
      className="w-full p-2 rounded-md bg-transparent text-white border border-gray-700 focus:outline-none focus:border-blue-500"
      {...props}
    />
  );
}

