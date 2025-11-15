// App.js
import React, { useState, useEffect } from 'react';
import { auth, onAuthStateChanged } from './firebaseConfig'; 

// Importa o NOVO navegador de autenticação
import AuthNavigator from './navigation/AuthNavigator'; 
// Importa as telas principais
import NavegacaoPrincipal from './screens/NavegacaoPrincipal';
import TelaDeCarregamento from './screens/TelaDeCarregamento';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) {
    return <TelaDeCarregamento />;
  }

  if (!user) {
    // 1. ANTES: <TelaDeLoginWrapper />
    // 2. AGORA:
    return <AuthNavigator />; 
  }

  // Quando logar, o usuário continua vendo a Navegação Principal
  return <NavegacaoPrincipal />;
}

export default App;