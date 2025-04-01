import React from 'react';
import Image from 'next/image';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <Image
              src="/pokeball.png"
              alt="Pokéball"
              fill
              className="object-contain"  
              priority
            />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
            Dikédex
          </h1>
        </div>
      </div>
    </header>
  );
}; 