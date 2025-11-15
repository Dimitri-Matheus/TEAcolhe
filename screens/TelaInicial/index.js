import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';
import styles from './style';

// 'navigation' é uma propriedade mágica que o React Navigation nos dá
export default function TelaInicial({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TeAcolhe</Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('TelaLogin')} // 2. Navega para Login
        >
          Entrar
        </Button>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('TelaCadastro')} // 1. Navega para Cadastrar
        >
          Cadastrar
        </Button>
      </View>
    </View>
  );
}