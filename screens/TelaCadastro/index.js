import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { 
  TextInput, Button, Headline, 
  Provider as PaperProvider, SegmentedButtons, Text
} from 'react-native-paper';
import styles from './style.js';

import { auth, db } from '../../firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

function TelaCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('TUTOR');

  const handleRegister = async () => {
    // 1. Validação de campos
    if (!nome || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Salva os dados no Firestore (incluindo o nome)
      await setDoc(doc(db, 'users', user.uid), {
        nome: nome, // Salva o nome
        email: user.email,
        tipo: userType,
        createdAt: serverTimestamp(),
      });
      // O App.js vai detectar o login e levar para a Home

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Este email já está em uso.');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao registrar.');
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Headline style={styles.title}>Faça seu cadastro</Headline>
      
      <View style={styles.selectorContainer}>
        <SegmentedButtons
          value={userType}
          onValueChange={setUserType}
          buttons={[
            { value: 'TUTOR', label: 'Tutor' },
            { value: 'USUARIO_TEA', label: 'Usuário' },
          ]}
        />
      </View>

      <TextInput label="Nome Completo" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput label="Senha" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <TextInput label="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry />

      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Cadastrar
      </Button>
    </View>
  );
}

export default function TelaCadastroWrapper() {
  return (
    <PaperProvider>
      <TelaCadastro />
    </PaperProvider>
  );
}