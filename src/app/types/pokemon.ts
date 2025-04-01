export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
} 