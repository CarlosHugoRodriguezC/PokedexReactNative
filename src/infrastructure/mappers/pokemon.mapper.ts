import {getColorFromImage} from '../../config/helpers/get-color';
import {Pokemon} from '../../domain/entities/pokemon.entity';
import {PokeAPIPokemon} from '../interfaces/pokeapi.interfaces';

export class PokemonMapper {
  static async pokeApiPokemonToEntity(
    pokeApiPokemon: PokeAPIPokemon,
  ): Promise<Pokemon> {
    const sprites = PokemonMapper.getSprites(pokeApiPokemon);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeApiPokemon.id}.png`;

    const {background, accent} = await getColorFromImage(avatar);

    return {
      id: pokeApiPokemon.id,
      name: pokeApiPokemon.name,
      types: pokeApiPokemon.types.map(type => type.type.name),
      avatar,
      sprites,
      color: background,
      colorAccent: accent,

      games: pokeApiPokemon.game_indices.map(game => game.version.name),
      stats: pokeApiPokemon.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      abilities: pokeApiPokemon.abilities.map(ability => ability.ability.name),
      moves: pokeApiPokemon.moves.map(move => ({
        name: move.move.name,
        level: move.version_group_details[0].level_learned_at,
      })),
    };
  }

  static getSprites(data: PokeAPIPokemon): string[] {
    const sprites: string[] = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ];

    if (data.sprites.other?.home.front_default)
      sprites.push(data.sprites.other?.home.front_default);
    if (data.sprites.other?.['official-artwork'].front_default)
      sprites.push(data.sprites.other?.['official-artwork'].front_default);
    if (data.sprites.other?.['official-artwork'].front_shiny)
      sprites.push(data.sprites.other?.['official-artwork'].front_shiny);
    if (data.sprites.other?.showdown.front_default)
      sprites.push(data.sprites.other?.showdown.front_default);
    if (data.sprites.other?.showdown.back_default)
      sprites.push(data.sprites.other?.showdown.back_default);

    return sprites;
  }
}
