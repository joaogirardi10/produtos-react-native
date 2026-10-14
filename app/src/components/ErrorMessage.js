import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
export default function ErrorMessage({ mensagem, onRetry }) {
  return <View style={styles.container}><Text style={styles.text}>⚠️ {mensagem}</Text>{onRetry && <Pressable onPress={onRetry} style={styles.button}><Text style={styles.label}>Tentar novamente</Text></Pressable>}</View>;
}
const styles = StyleSheet.create({ container: { padding: 18, alignItems: 'center' }, text: { color: '#b91c1c', textAlign: 'center', marginBottom: 12 }, button: { backgroundColor: '#dbeafe', borderRadius: 10, padding: 12 }, label: { color: '#1d4ed8', fontWeight: '700' } });