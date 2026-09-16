import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CardapioTela from './src/screens/CardapioTela';
import CarrinhoTela from './src/screens/CarrinhoTela';
import { CarrinhoProvider } from './src/context/CarrinhoContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // RNF02 — Provider envolve todo o navigator, então o carrinho fica
    // acessível e sincronizado em qualquer tela (estado compartilhado).
    <CarrinhoProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Cardapio"
            component={CardapioTela}
          />
          <Stack.Screen
            name="Carrinho"
            component={CarrinhoTela}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}
