import React, { useState } from 'react';

interface SortButtonProps {
  onSort: (sortType: string) => void;
}

export const SortButton: React.FC<SortButtonProps> = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'number-asc', label: 'Menor Número' },
    { value: 'number-desc', label: 'Maior Número' },
    { value: 'name-asc', label: 'A-Z' },
    { value: 'name-desc', label: 'Z-A' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 rounded-lg border cursor-pointer border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent flex items-center justify-between"
      >
        <span>Ordenar</span>
        <svg className={`w-4 h-4 cursor-pointer transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute cursor-pointer right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSort(option.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 cursor-pointer text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 