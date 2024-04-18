import {createStackNavigator} from '@react-navigation/stack';
import * as screens from '../screens';
import {PokemonScreen} from '../screens/pokemon/PokemonScreen';

export type RootStackPrams = {
  HomeScreen: undefined;
  PokemonScreen: {pokemonId: number};
  SearchScreen: undefined;
};

const Stack = createStackNavigator<RootStackPrams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={screens.HomeScreen} />
      <Stack.Screen name="SearchScreen" component={screens.SearchScreen} />
      <Stack.Screen name="PokemonScreen" component={screens.PokemonScreen} />
    </Stack.Navigator>
  );
};
