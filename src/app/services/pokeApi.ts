import { Pokemon } from '../components/PokeCard/types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Generation {
  id: number;
  name: string;
  pokemon: PokemonListItem[];
}

interface GenerationResponse {
  id: number;
  name: string;
  pokemon_species: PokemonListItem[];
}

export const getPokemon = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon data');
  }
  return response.json();
};

export const getGeneration = async (id: number): Promise<Generation> => {
  const response = await fetch(`${BASE_URL}/generation/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch generation data');
  }
  const data: GenerationResponse = await response.json();
  
  return {
    id: data.id,
    name: data.name,
    pokemon: data.pokemon_species.map(species => ({
      name: species.name,
      url: species.url.replace('pokemon-species', 'pokemon')
    }))
  };
};

export const getAllGenerations = async (): Promise<Generation[]> => {
  const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const promises = generations.map(id => getGeneration(id));
  return Promise.all(promises);
};

export const getRandomPokemon = async (): Promise<Pokemon> => {
  const randomId = Math.floor(Math.random() * 151) + 1;
  return getPokemon(randomId);
}; 