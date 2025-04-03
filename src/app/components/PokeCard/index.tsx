'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Pokemon } from '../../types/pokemon';
import { Modal } from '../Modal';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { typeTranslations } from '../../utils/translations';

interface PokeCardProps {
  pokemon: Pokemon;
}

export const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPokemonImage = () => {
    return pokemon.sprites.other['official-artwork'].front_default;
  };

  return (
    <>
      <Card 
        className="cursor-pointer transition-all bg-white dark:bg-gray-800 duration-200 hover:scale-105 hover:shadow-lg border-0"
        onClick={() => setIsModalOpen(true)}
      >
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold capitalize">
            {pokemon.name}
          </CardTitle>
          <span className="text-sm text-gray-500">
            Nº {String(pokemon.id).padStart(3, '000')}
          </span>
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative w-full h-48">
            <Image
              src={getPokemonImage()}
              alt={pokemon.name}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex gap-2 mt-4">
            {pokemon.types.map((type) => (
              <Button
                key={type.type.name}
                variant="outline"
                className="capitalize text-white hover:text-white cursor-pointer"
                style={{ backgroundColor: `var(--type-${type.type.name})` }}
              >
                {typeTranslations[type.type.name]}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

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
