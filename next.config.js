/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/PokeAPI/sprites/**',
      },
      {
        protocol: 'https',
        hostname: 'pokeapi.co',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.pokemon.com',
        port: '',
        pathname: '/assets/cms2/img/pokedex/**',
      }
    ],
  },
};

module.exports = nextConfig; 