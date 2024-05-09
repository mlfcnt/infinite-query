import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "../api";

type Props = {
  pokemonName: PokemonSkeletton["name"];
};

export type PokemonSkeletton = {
  name: string;
  url: string;
};

type Pokemon = {
  name: string;
  id: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
};

export const PokemonCard = ({ pokemonName }: Props) => {
  const { data: fetchedPokemon, isPending } = useQuery<Pokemon>({
    queryKey: ["pokemon", pokemonName],
    queryFn: () => fetchPokemon(pokemonName),
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div key={fetchedPokemon?.id}>
      <h3>{fetchedPokemon?.name}</h3>
      <img
        src={fetchedPokemon?.sprites.front_default}
        alt={fetchedPokemon?.name}
      />
    </div>
  );
};
