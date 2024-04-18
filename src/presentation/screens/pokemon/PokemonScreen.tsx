import {StackScreenProps} from '@react-navigation/stack';
import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import {RootStackPrams} from '../../navigators/StackNavigator';
import {Chip, Text} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {getPokemonById} from '../../../actions/pokemons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {FullScreenLoader} from '../../components/ui';
import {Formatter} from '../../../config/helpers';
import {useContext, useMemo} from 'react';
import {ThemeContext} from '../../context/ThemeContext';

interface Props extends StackScreenProps<RootStackPrams, 'PokemonScreen'> {}

export const PokemonScreen = ({route, navigation}: Props) => {
  const {pokemonId} = route.params;

  const {isDark} = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();

  const pokeballImg = useMemo(() => {
    return isDark
      ? require('../../assets/pokeball-dark.png')
      : require('../../assets/pokeball-light.png');
  }, [isDark]);

  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!pokemon) {
    return null;
  }

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: pokemon.color}}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            color: pokemon.colorAccent,
            top: top + 5,
          }}>
          {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
        </Text>

        {/* Pokeball */}
        <Image source={pokeballImg} style={styles.pokeball} />

        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
      </View>

      {/* Types */}
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
        {pokemon.types.map(type => (
          <Chip
            key={type}
            mode="outlined"
            selectedColor={pokemon.colorAccent}
            style={{marginLeft: 10}}>
            {type}
          </Chip>
        ))}
      </View>

      {/* Sprites */}
      <FlatList
        data={pokemon.sprites}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        style={{
          marginTop: 20,
          height: 100,
        }}
        renderItem={({item}) => (
          <FadeInImage
            uri={item}
            style={{
              width: 100,
              height: 100,
              marginHorizontal: 5,
              resizeMode: 'contain',
            }}
          />
        )}
      />

      {/* Abilities */}
      <Text style={[styles.subTitle, {color: pokemon.colorAccent}]}>
        Abilities
      </Text>
      <View style={styles.statsContainer}>
        <FlatList
          data={pokemon.abilities}
          horizontal
          keyExtractor={item => item}
          renderItem={({item}) => (
            <Text style={{marginVertical: 5}}>
              {Formatter.capitalize(item)}
            </Text>
          )}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
        />
      </View>

      {/* Stats */}
      <Text style={[styles.subTitle, {color: pokemon.colorAccent}]}>Stats</Text>
      <View style={styles.statsContainer}>
        <FlatList
          data={pokemon.stats}
          horizontal
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{marginVertical: 5}}>
                {Formatter.capitalize(item.name)}
              </Text>
              <Text style={{marginVertical: 5}}>{item.value}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
        />
      </View>

      {/* Moves */}
      <Text style={[styles.subTitle, {color: pokemon.colorAccent}]}>Moves</Text>
      <View style={styles.statsContainer}>
        <FlatList
          data={pokemon.moves}
          horizontal
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>{Formatter.capitalize(item.name)}</Text>
              <Text style={{marginVertical: 5}}>Level: {item.level}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
        />
      </View>

      <View style={{height: 100}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'flex-start',
  },
});
