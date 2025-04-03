import React, { useState } from 'react';

interface GenerationSelectorProps {
  selectedGeneration: number;
  onGenerationChange: (generation: number) => void;
}

const generations = [
  { value: 0, label: 'Todas as Gerações' },
  { value: 1, label: '1ª Geração (Kanto)' },
  { value: 2, label: '2ª Geração (Johto)' },
  { value: 3, label: '3ª Geração (Hoenn)' },
  { value: 4, label: '4ª Geração (Sinnoh)' },
  { value: 5, label: '5ª Geração (Unova)' },
  { value: 6, label: '6ª Geração (Kalos)' },
  { value: 7, label: '7ª Geração (Alola)' },
  { value: 8, label: '8ª Geração (Galar)' },
  { value: 9, label: '9ª Geração (Paldea)' }
];

export const GenerationSelector: React.FC<GenerationSelectorProps> = ({
  selectedGeneration,
  onGenerationChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = generations.find(g => g.value === selectedGeneration)?.label || 'Selecione uma Geração';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full cursor-pointer px-4 py-2 rounded-lg border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent flex items-center justify-between"
      >
        <span className="truncate">{selectedLabel}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          {generations.map((generation) => (
            <button
              key={generation.value}
              onClick={() => {
                onGenerationChange(generation.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 cursor-pointer text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
            >
              {generation.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 