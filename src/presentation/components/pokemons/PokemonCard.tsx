import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Pokemon} from '../../../domain/entities/pokemon.entity';
import {Card, Text} from 'react-native-paper';
import {FadeInImage} from '../ui/FadeInImage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackPrams} from '../../navigators/StackNavigator';
import {Formatter} from '../../../config/helpers';

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackPrams>>();

  return (
    <Pressable
      style={{flex: 1}}
      onPress={() =>
        navigation.navigate('PokemonScreen', {pokemonId: pokemon.id})
      }>
      <Card style={[styles.cardContainer, {backgroundColor: pokemon.color}]}>
        <Text
          style={[styles.name, {color: pokemon.colorAccent}]}
          variant="bodyLarge"
          lineBreakMode="middle">
          {Formatter.capitalize(`${pokemon.name} \n#${pokemon.id}`)}
        </Text>
        {/* pokeball background */}
        <View style={styles.pokeballContainer}>
          <Image
            source={require('../../assets/pokeball-light.png')}
            style={styles.pokeball}
          />
        </View>
        {/* pokemon image */}
        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
        {/* types */}
        <Text
          style={[styles.type, {marginTop: 35, color: pokemon.colorAccent}]}>
          {pokemon.types.at(0) ?? 'No type'}
        </Text>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    top: 10,
    left: 10,
  },
  type: {
    color: 'white',
    fontSize: 16,
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -30,
  },

  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },
});
