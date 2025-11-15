import React, { useState } from 'react';
import { View, Alert, Image } from 'react-native';
import { 
  TextInput, Button, Headline, 
  Provider as PaperProvider
} from 'react-native-paper';

import styles from './style.js';

import { auth } from '../../firebaseConfig.js'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

function TelaDeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha email e senha.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // O App.js vai detectar o login e levar para a Home
    } catch (error) {
      Alert.alert('Erro', 'Email ou senha inválidos.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      
      <Headline style={styles.title}>Faça o seu login</Headline>

      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput label="Senha" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
      </Button>
    </View>
  );
}

export default function TelaLoginWrapper() {
  return (
    <PaperProvider>
      <TelaDeLogin />
    </PaperProvider>
  );
}