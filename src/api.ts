import { PokemonSkeletton } from "./components/PokemonCard";

type Params = {
  limit?: number;
  offset?: number;
};

export const fetchPokemons = async ({
  limit = 10,
  offset = 0,
}: Params = {}) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();
  return data.results as PokemonSkeletton[];
};

export const fetchPokemon = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  return data;
};
