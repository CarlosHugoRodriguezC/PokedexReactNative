import 'react-native-gesture-handler';
import {CustomStatusBar} from './presentation/components/ui';
import {StackNavigator} from './presentation/navigators/StackNavigator';
import {ThemeContextProvider} from './presentation/context/ThemeContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export const PokedexApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <CustomStatusBar />
        <StackNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};
