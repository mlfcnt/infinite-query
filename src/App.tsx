import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import "./App.css";
import { fetchPokemons } from "./api";
import { PokemonCard } from "./components/PokemonCard";
import { RefreshButton } from "./components/RefreshButton";

const LIMIT = 10;

function App() {
  const { data, fetchNextPage, isPending } = useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      fetchPokemons({
        limit: LIMIT,
        offset: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (_, pages) => pages.length * LIMIT,
    queryKey: ["pokemons"],
  });

  if (!data) return <p>Loading...</p>;

  const lastPage = data.pages.length;

  return (
    <div className="App">
      <h1>Infinite query with pokemons</h1>
      <h3>Page : {Number(lastPage)}</h3>
      {data.pages.map((page, index) => (
        <div key={index}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {page.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemonName={pokemon.name} />
            ))}
          </div>
        </div>
      ))}
      <RefreshButton fetchNextPage={fetchNextPage} isPending={isPending} />
    </div>
  );
}

export default App;
