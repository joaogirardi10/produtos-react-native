import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
export default function PrimaryButton({ title, onPress, disabled = false, danger = false }) {
  return <Pressable disabled={disabled} onPress={onPress} style={[styles.button, danger && styles.danger, disabled && styles.disabled]}><Text style={styles.text}>{title}</Text>{disabled && <ActivityIndicator color="#fff" style={{ marginLeft: 9 }} />}</Pressable>;
}
const styles = StyleSheet.create({ button: { backgroundColor: '#2563eb', minHeight: 50, paddingHorizontal: 18, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 6 }, danger: { backgroundColor: '#dc2626' }, disabled: { opacity: 0.6 }, text: { color: 'white', fontWeight: '800', fontSize: 15 } });