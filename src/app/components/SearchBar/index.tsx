import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Search className="absolute w-4 h-4 right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
    </div>
  );
};

export default SearchBar; 