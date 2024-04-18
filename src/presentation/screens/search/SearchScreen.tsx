import {FlatList, View} from 'react-native';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import {Pokemon} from '../../../domain/entities/pokemon.entity';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {useQuery} from '@tanstack/react-query';
import {
  getPokemonsByIds,
  getPokmeonsNamesWithIds,
} from '../../../actions/pokemons';
import {useMemo, useState} from 'react';
import {FullScreenLoader} from '../../components/ui';
import {useDebounceValue} from '../../hooks/useDebounceValue';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isLoading, data: pokemonNameList = []} = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokmeonsNamesWithIds(),
  });

  const [searchTerm, setSearchTerm] = useState('');
  const {debounceValue} = useDebounceValue(searchTerm, 500);

  const pokemonNameIdList = useMemo(() => {
    if (!isNaN(Number(searchTerm))) {
      const pokemon = pokemonNameList.find(
        item => item.id === Number(searchTerm),
      );

      return pokemon ? [pokemon] : [];
    }

    if (debounceValue.trim().length === 0) return [];

    if (debounceValue.length < 3) return [];

    return pokemonNameList.filter(pokemon =>
      pokemon.name.includes(debounceValue.toLowerCase()),
    );
  }, [debounceValue]);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () =>
      getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top}]}>
      <TextInput
        placeholder="Search Pokemon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      {isLoadingPokemons && (
        <ActivityIndicator size={50} style={{height: 100, paddingTop: 20}} />
      )}

      {/* <Text>{JSON.stringify(pokemonNameIdList, null, 2)}</Text> */}

      <FlatList
        data={pokemons as Pokemon[]}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        style={{paddingVertical: 20}}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.6}
        ListFooterComponent={<View style={{height: 120}} />}
      />
    </View>
  );
};
