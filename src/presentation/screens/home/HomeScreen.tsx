import {StyleSheet, View} from 'react-native';
import {getPokemons} from '../../../actions/pokemons';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {PokeballBg} from '../../components/ui/PokeballBg';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {ActivityIndicator, FAB, Text, useTheme} from 'react-native-paper';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {RootStackPrams} from '../../navigators/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackPrams, 'HomeScreen'> {}

export const HomeScreen = (props: Props) => {
  const {navigation} = props;
  const {top} = useSafeAreaInsets();
  const theme = useTheme();
  const queryClient = useQueryClient();

  const {isLoading, data, isFetching, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: async ({pageParam}) => {
      const pokemons = await getPokemons(pageParam);

      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={data?.pages.flat() ?? []}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        ListHeaderComponent={<Text variant="displayMedium">Pokedex</Text>}
        style={{paddingTop: top + 20}}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        ListFooterComponent={
          <View style={{height: 120, marginBottom: top + 20}}>
            {(isLoading || isFetching) && <ActivityIndicator size={50} />}
          </View>
        }
      />
      <FAB
        label="Buscar"
        style={[globalTheme.fab, {backgroundColor: theme.colors.primary}]}
        mode="elevated"
        onPress={() => navigation.navigate('SearchScreen')}
        color={theme.dark ? 'black' : 'white'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
