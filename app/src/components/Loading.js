import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
export default function Loading({ texto = 'Carregando...' }) {
  return <View style={styles.container}><ActivityIndicator size="large" color="#2563eb" /><Text style={styles.text}>{texto}</Text></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }, text: { marginTop: 12, color: '#64748b' } });