import {pokeApi} from '../../config/api/pokeApi';
import {Pokemon} from '../../domain/entities/pokemon.entity';
import {PokeAPIPokemon} from '../../infrastructure/interfaces/pokeapi.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const url = `/pokemon/${id}`;
    const {data} = await pokeApi.get<PokeAPIPokemon>(url);

    return PokemonMapper.pokeApiPokemonToEntity(data);
  } catch (error) {
    console.log('Error fetching pokemons', error);
    throw new Error(`Pokemon with id ${id} not found`);
  }
};
