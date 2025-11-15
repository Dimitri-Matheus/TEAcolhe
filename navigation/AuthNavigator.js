import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as 3 telas que criamos
import TelaInicial from '../screens/TelaInicial';
import TelaLoginWrapper from '../screens/TelaLogin'; // Importamos o Wrapper
import TelaCadastroWrapper from '../screens/TelaCadastro'; // Importamos o Wrapper

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TelaInicial" // A primeira tela é a de Boas-vindas
        screenOptions={{
          headerShown: false // Esconde o cabeçalho
        }}
      >
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="TelaLogin" component={TelaLoginWrapper} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastroWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}