import {pokeApi} from '../../config/api/pokeApi';
import {Pokemon} from '../../domain/entities/pokemon.entity';
import {
  PokeAPIPaginationResponse,
  PokeAPIPokemon,
} from '../../infrastructure/interfaces/pokeapi.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemons = async (
  page: number,
  limit: number = 20,
): Promise<Pokemon[]> => {
  try {
    const url = `/pokemon/?offset=${page * limit}&limit=${limit}`;
    const {data} = await pokeApi.get<PokeAPIPaginationResponse>(url);

    const pokemonPromises = data.results.map(info => {
      return pokeApi.get<PokeAPIPokemon>(info.url);
    });

    const pokemonsResult = await Promise.all(pokemonPromises);

    const pokemonsPromises = pokemonsResult.map(pokeApiPokemon =>
      PokemonMapper.pokeApiPokemonToEntity(pokeApiPokemon.data),
    );

    const pokemons = await Promise.all(pokemonsPromises);

    return pokemons;
  } catch (error) {
    console.log('Error fetching pokemons', error);
    throw new Error('Error fetching pokemons');
  }
};
