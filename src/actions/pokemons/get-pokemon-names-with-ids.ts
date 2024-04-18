export const getPokmeonsNamesWithIds = async (): Promise<
  {
    name: string;
    id: number;
  }[]
> => {
  try {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=1118',
    );
    const {results} = await response.json();
    return results.map(
      (pokemon: {name: string; url: string}, index: number) => ({
        id: Number(pokemon.url.split('/').at(-2) ?? index.toString()),
        name: pokemon.name,
      }),
    );
  } catch (error) {
    console.log(error);
    throw new Error('Error getting pokemons names with ids');
  }
};
