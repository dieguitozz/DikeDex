import React, { useState } from 'react';
import Image from 'next/image';
import { Pokemon } from '@/app/types/pokemon';
import { typeTranslations} from '@/app/utils/translations';
import { Modal } from '../Modal';

interface PokeCardProps {
  pokemon: Pokemon;
}

export const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      >
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
          <span className="text-gray-600">Nº {String(pokemon.id).padStart(3, '000')}</span>
        </div>

        <div className="relative w-full h-48 mb-4">
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="px-3 py-1 rounded text-sm font-medium capitalize"
              style={{
                backgroundColor: `var(--type-${type.type.name})`,
                color: 'white'
              }}
            >
              {typeTranslations[type.type.name]}
            </span>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          pokemon={pokemon}
          onClose={() => setIsModalOpen(false)}
          onPrevious={() => {}}
          onNext={() => {}}
          isFirst={false}
          isLast={false}
        />
      )}
    </>
  );
};
