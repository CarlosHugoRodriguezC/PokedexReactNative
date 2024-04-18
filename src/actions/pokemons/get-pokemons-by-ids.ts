import {Pokemon} from '../../domain/entities/pokemon.entity';
import {getPokemonById} from './get-pokemon-by-id';

export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {
  try {
    const promises: Promise<Pokemon>[] = ids.map(id => getPokemonById(id));

    return await Promise.all(promises);
  } catch (error) {
    console.log(error);
    throw new Error('Error getting pokemons by ids');
  }
};
