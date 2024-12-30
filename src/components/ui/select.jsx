import React from 'react';

export function Select({ children }) {
  return (
    <div className="relative inline-block text-left">
      {children}
    </div>
  );
}

export function SelectTrigger({ children, className, ...props }) {
  return (
    <button 
      className={`inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SelectContent({ children }) {
  return (
    <div className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      {children}
    </div>
  );
}

export function SelectItem({ children, value }) {
  return (
    <button
      className="text-gray-200 block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
      value={value}
    >
      {children}
    </button>
  );
}

export function SelectValue({ children }) {
  return <span>{children}</span>;
}

