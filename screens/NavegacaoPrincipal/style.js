import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  logoutButtonContainer: {
    position: 'absolute', // Prende o botão na base
    bottom: 40,
    width: '90%',
  },
  // --- NOVOS ESTILOS ---
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  // Para o Tutor
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center'
  },
  // Para o Usuário
  codeContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  codeText: {
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 8,
  },
});

export default styles;