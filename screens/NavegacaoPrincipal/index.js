// screens/NavegacaoPrincipal/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, TextInput } from 'react-native';
import styles from './style'; // Estilos separados

// Imports do Firebase
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { 
  doc, onSnapshot, updateDoc,
  collection, query, where, getDocs, writeBatch
} from 'firebase/firestore';

export default function NavegacaoPrincipal() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Estados para a lógica de conexão
  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [isLinking, setIsLinking] = useState(false);

  const userUID = auth.currentUser?.uid;

  useEffect(() => {
    if (!userUID) return;

    // --- MUDANÇA IMPORTANTE ---
    // Usamos onSnapshot para ouvir em tempo real.
    // Isso atualiza a tela instantaneamente quando a conexão é feita.
    const docRef = doc(db, 'users', userUID);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);

        // Se eu sou um Usuário, não tenho tutor E não tenho código...
        if (data.tipo === 'USUARIO_TEA' && !data.tutorConectado && !data.codigoConvite) {
          // ...cria um novo código.
          const novoCodigo = Math.random().toString(36).substring(2, 8).toUpperCase();
          // Atualiza o documento no Firestore com o novo código
          updateDoc(docRef, {
            codigoConvite: novoCodigo
          });
          // O onSnapshot vai rodar de novo e atualizar o estado
        }
      } else {
        console.log("Documento não encontrado!");
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Limpa o "ouvinte"
  }, [userUID]);

  // Função de Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair.");
    }
  };

  // Função para o TUTOR se conectar
  const handleLinkCode = async () => {
    if (inviteCodeInput.length < 6) {
      Alert.alert("Erro", "O código deve ter 6 caracteres.");
      return;
    }
    setIsLinking(true);

    try {
      // Procura o usuário que tem esse código
      const usersRef = collection(db, 'users');
      const q = query(usersRef, 
        where("codigoConvite", "==", inviteCodeInput.toUpperCase()),
        where("tipo", "==", "USUARIO_TEA")
      );
      
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Erro", "Nenhum usuário encontrado com este código.");
        setIsLinking(false);
        return;
      }

      const userToLinkDoc = querySnapshot.docs[0];
      const userToLinkUID = userToLinkDoc.id;

      // ATUALIZA OS DOIS DOCUMENTOS (Tutor e Usuário)
      const batch = writeBatch(db);

      // 1. Atualiza o documento do TUTOR
      const tutorDocRef = doc(db, 'users', userUID);
      batch.update(tutorDocRef, {
        usuarioConectado: userToLinkUID
      });

      // 2. Atualiza o documento do USUÁRIO (TEA)
      const userDocRef = doc(db, 'users', userToLinkUID);
      batch.update(userDocRef, {
        tutorConectado: userUID,
        codigoConvite: null // Apaga o código
      });

      await batch.commit();
      Alert.alert("Sucesso!", "Vocês estão conectados!");
      // O onSnapshot vai atualizar as telas de ambos os usuários

    } catch (error) {
      console.error("Erro ao conectar:", error);
      Alert.alert("Erro", "Não foi possível conectar.");
    } finally {
      setIsLinking(false);
    }
  };


  // ----- RENDERIZAÇÃO -----
  
  if (loading || !userData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  // ----- SE FOR TUTOR -----
  if (userData.tipo === 'TUTOR') {
    // Se o Tutor JÁ ESTÁ conectado
    if (userData.usuarioConectado) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Tutor Conectado!</Text>
          <Text style={styles.text}>Aqui ficará o mapa de localização.</Text>
          {/* Botão de Logout */}
          <View style={styles.logoutButtonContainer}>
            <Button title="Sair" onPress={handleLogout} color="#d32f2f" />
          </View>
        </View>
      );
    }
    
    // Se o Tutor AINDA NÃO está conectado
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Conectar ao Usuário</Text>
        <Text style={styles.info}>Insira o código de 6 dígitos que aparece no aplicativo do usuário:</Text>
        
        <TextInput
          placeholder="Código de Convite"
          value={inviteCodeInput}
          onChangeText={setInviteCodeInput}
          style={styles.input}
          autoCapitalize="characters"
          maxLength={6}
          editable={!isLinking}
        />
        <Button
          title={isLinking ? "Conectando..." : "Conectar"}
          onPress={handleLinkCode}
          disabled={isLinking}
        />
        {/* Botão de Logout */}
        <View style={styles.logoutButtonContainer}>
          <Button title="Sair" onPress={handleLogout} color="#d32f2f" />
        </View>
      </View>
    );
  }

  // ----- SE FOR USUÁRIO (TEA) -----
  if (userData.tipo === 'USUARIO_TEA') {
    // Se o Usuário JÁ ESTÁ conectado
    if (userData.tutorConectado) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Usuário Conectado!</Text>
          <Text style={styles.text}>Aqui ficarão os botões de emoção/alerta.</Text>
          {/* Botão de Logout */}
          <View style={styles.logoutButtonContainer}>
            <Button title="Sair" onPress={handleLogout} color="#d32f2f" />
          </View>
        </View>
      );
    }

    // Se o Usuário AINDA NÃO está conectado
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Meu Código de Convite</Text>
        <Text style={styles.info}>Mostre este código para seu tutor:</Text>
        
        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>
            {userData.codigoConvite ? userData.codigoConvite : '...'}
          </Text>
        </View>

        {/* Botão de Logout */}
        <View style={styles.logoutButtonContainer}>
          <Button title="Sair" onPress={handleLogout} color="#d32f2f" />
        </View>
      </View>
    );
  }
  
  // Fallback (caso o tipo não seja nenhum dos dois, o que não deve acontecer)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tipo de usuário desconhecido.</Text>
      <Button title="Sair" onPress={handleLogout} color="#d32f2f" />
    </View>
  );
}