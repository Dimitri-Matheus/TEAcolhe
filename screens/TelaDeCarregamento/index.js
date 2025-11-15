import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './style';

export default function TelaDeCarregamento() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6200ee" />
    </View>
  );
}