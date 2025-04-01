'use client';

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import { PokeCard } from './components/PokeCard';
import { GenerationSelector } from './components/GenerationSelector';
import { SortButton } from './components/SortButton';
import { Pokemon } from './types/pokemon';
import Image from 'next/image';

const generations = [
  { number: 1, name: '1ª Geração', start: 1, end: 151 },
  { number: 2, name: '2ª Geração', start: 152, end: 251 },
  { number: 3, name: '3ª Geração', start: 252, end: 386 },
  { number: 4, name: '4ª Geração', start: 387, end: 493 },
  { number: 5, name: '5ª Geração', start: 494, end: 649 },
  { number: 6, name: '6ª Geração', start: 650, end: 721 },
  { number: 7, name: '7ª Geração', start: 722, end: 809 },
  { number: 8, name: '8ª Geração', start: 810, end: 905 },
  { number: 9, name: '9ª Geração', start: 906, end: 1010 }
];

const POKEMONS_PER_PAGE = 50;

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGeneration, setSelectedGeneration] = useState(0);
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        if (selectedGeneration === 0) {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010');
          const data = await response.json();
          const promises = data.results.map((pokemon: { url: string }) => 
            fetch(pokemon.url).then(res => res.json())
          );
          const results = await Promise.all(promises);
          setPokemons(results);
          setFilteredPokemons(results);
        } else {
          const generation = generations.find(g => g.number === selectedGeneration);
          if (!generation) return;

          const promises = Array.from(
            { length: generation.end - generation.start + 1 },
            (_, i) => fetch(`https://pokeapi.co/api/v2/pokemon/${generation.start + i}`).then(res => res.json())
          );

          const results = await Promise.all(promises);
          setPokemons(results);
          setFilteredPokemons(results);
        }
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [selectedGeneration]);

  useEffect(() => {
    const start = 0;
    const end = currentPage * POKEMONS_PER_PAGE;
    setDisplayedPokemons(filteredPokemons.slice(start, end));
  }, [filteredPokemons, currentPage]);

  const handleSearch = (query: string) => {
    const filtered = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemons(filtered);
    setCurrentPage(1);
  };

  const handleGenerationChange = (generation: number) => {
    setSelectedGeneration(generation);
    setCurrentPage(1);
  };

  const handleSort = (sortType: string) => {
    const sorted = [...filteredPokemons].sort((a, b) => {
      switch (sortType) {
        case 'number-asc':
          return a.id - b.id;
        case 'number-desc':
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    setFilteredPokemons(sorted);
    setCurrentPage(1);
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-16 h-16">
              <Image
                src="/pokeball.png"
                alt="Pokéball"
                fill
                className="object-contain animate-spin-slow"
                priority
              />
            </div>
            <div className="text-center text-2xl font-bold text-gray-700">
              Carregando Pokémons...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="w-full sm:w-48">
            <SortButton onSort={handleSort} />
          </div>
          <div className="w-full sm:w-48">
            <GenerationSelector
              selectedGeneration={selectedGeneration}
              onGenerationChange={handleGenerationChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {displayedPokemons.map((pokemon) => (
            <PokeCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>

        {displayedPokemons.length < filteredPokemons.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition-colors duration-200"
            >
              Mostrar Mais
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
