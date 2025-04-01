import { Generation } from '../../services/pokeApi';
import { Pokemon } from '../PokeCard/types';

interface PokemonListProps {
  generations: Generation[];
  selectedPokemon: Pokemon | null;
  onPokemonSelect: (pokemon: Pokemon) => void;
  loading: boolean;
  searchQuery: string;
}

const PokemonList = ({ generations, onPokemonSelect, loading, searchQuery }: PokemonListProps) => {
  const getPokemonIdFromUrl = (url: string): number => {
    const matches = url.match(/\/pokemon\/(\d+)\//);
    return matches ? parseInt(matches[1]) : 0;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-xl text-gray-600">Carregando gerações...</div>
      </div>
    );
  }

  if (!generations || generations.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-xl text-gray-600">Nenhuma geração encontrada</div>
      </div>
    );
  }

  const filteredGenerations = generations.map(generation => ({
    ...generation,
    pokemon: generation.pokemon
      .filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => getPokemonIdFromUrl(a.url) - getPokemonIdFromUrl(b.url))
  })).filter(generation => generation.pokemon.length > 0);

  if (filteredGenerations.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-center text-2xl font-bold text-gray-700">
          Nenhum Pokémon encontrado para &quot;{searchQuery}&quot;
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {filteredGenerations.map((generation) => (
        <div key={generation.id} className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 capitalize">Geração {generation.id}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {generation.pokemon.map((pokemon) => {
              const id = getPokemonIdFromUrl(pokemon.url);
              return (
                <div
                  key={id}
                  className="bg-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onPokemonSelect({ id } as Pokemon)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{String(id).padStart(3, '0')}</span>
                    <span className="font-medium capitalize">{pokemon.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonList; 