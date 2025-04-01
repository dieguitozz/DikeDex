import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Pokemon } from '@/app/types/pokemon';
import { typeTranslations, statTranslations } from '@/app/utils/translations';

interface ModalProps {
  pokemon: Pokemon;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  pokemon,
  onClose
}) => {
  const [isShiny, setIsShiny] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleShinyChange = (shiny: boolean) => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsShiny(shiny);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }, 500);
  };

  const getPokemonImage = () => {
    if (isShiny) {
      return pokemon.sprites.other['official-artwork'].front_shiny;
    }
    return pokemon.sprites.other['official-artwork'].front_default;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-white/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg [&::-webkit-scrollbar]:w-4 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h2>
            <span className="text-xl text-gray-600">Nº {String(pokemon.id).padStart(3, '000')}</span>
          </div>

          <div className="relative w-72 h-72">
            <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              <Image
                src={getPokemonImage()}
                alt={pokemon.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            {isAnimating && (
              <>
                <div className="absolute inset-0 bg-white animate-flash" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-sparkle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_46947_7445)">
                        <path d="M11.7333 0L13.5 10.2857L24 11.5298L13.5 14L11.7333 24L10 14L0 11.5298L10 10.2857L11.7333 0Z" fill="#FFEA00" />
                      </g>
                      <defs>
                        <clipPath id="clip0_46947_7445">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="absolute top-1/4 left-1/4 animate-sparkle-delayed-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_46947_7445)">
                      <path d="M11.7333 0L13.5 10.2857L24 11.5298L13.5 14L11.7333 24L10 14L0 11.5298L10 10.2857L11.7333 0Z" fill="#FFEA00" />
                    </g>
                    <defs>
                      <clipPath id="clip0_46947_7445">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="absolute top-1/4 right-1/4 animate-sparkle-delayed-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_46947_7445)">
                      <path d="M11.7333 0L13.5 10.2857L24 11.5298L13.5 14L11.7333 24L10 14L0 11.5298L10 10.2857L11.7333 0Z" fill="#FFEA00" />
                    </g>
                    <defs>
                      <clipPath id="clip0_46947_7445">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="absolute bottom-1/4 left-1/4 animate-sparkle-delayed-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_46947_7445)">
                      <path d="M11.7333 0L13.5 10.2857L24 11.5298L13.5 14L11.7333 24L10 14L0 11.5298L10 10.2857L11.7333 0Z" fill="#FFEA00" />
                    </g>
                    <defs>
                      <clipPath id="clip0_46947_7445">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="absolute bottom-1/4 right-1/4 animate-sparkle-delayed-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_46947_7445)">
                      <path d="M11.7333 0L13.5 10.2857L24 11.5298L13.5 14L11.7333 24L10 14L0 11.5298L10 10.2857L11.7333 0Z" fill="#FFEA00" />
                    </g>
                    <defs>
                      <clipPath id="clip0_46947_7445">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-4 py-2 rounded text-lg font-medium capitalize"
                style={{
                  backgroundColor: `var(--type-${type.type.name})`,
                  color: 'white'
                }}
              >
                {typeTranslations[type.type.name]}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => handleShinyChange(false)}
              disabled={isAnimating}
              className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition-colors flex items-center gap-2 ${!isShiny
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Image
                src="/pokeballfigma.svg"
                alt="Pokéball"
                width={20}
                height={20}
                className={`${!isShiny ? 'brightness-0 invert' : ''}`}
              />
              Normal
            </button>
            <button
              onClick={() => handleShinyChange(true)}
              disabled={isAnimating}
              className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition-colors flex items-center gap-2 ${isShiny
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Image
                src="/pokeballfigma.svg"
                alt="Pokéball"
                width={20}
                height={20}
                className={`${isShiny ? 'brightness-0 invert' : ''}`}
              />
              Shiny
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 w-full">
            <div className="text-center">
              <p className="text-gray-600 mb-1">Altura</p>
              <p className="text-xl font-semibold">{pokemon.height / 10}m</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-1">Peso</p>
              <p className="text-xl font-semibold">{pokemon.weight / 10}kg</p>
            </div>
          </div>

          <div className="w-full space-y-4">
            <h3 className="text-xl font-bold mb-4">Estatísticas Base</h3>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium">{statTranslations[stat.stat.name]}</span>
                  <span className="font-semibold">{stat.base_stat}</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(stat.base_stat / 120) * 100}%`,
                      backgroundColor: `var(--type-${pokemon.types[0].type.name})`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 