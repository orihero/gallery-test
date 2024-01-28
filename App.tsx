/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import SafeAreaView from './src/components/SafeAreaView';
import AppRouter from './src/router/AppRouter';
import { SafeAreaProvider } from 'react-native-safe-area-context';


function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <AppRouter />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
