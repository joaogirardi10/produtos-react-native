import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
export const moeda = (number) => Number(number).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export default function ProductCard({ produto, onPress }) {
  return <Pressable onPress={onPress} style={styles.card} accessibilityRole="button"><View style={styles.top}><Text style={styles.nome}>{produto.nome}</Text><Text style={styles.price}>{moeda(produto.preco)}</Text></View><Text style={styles.descricao} numberOfLines={2}>{produto.descricao || 'Sem descrição'}</Text><Text style={styles.estoque}>Estoque: {produto.estoque} unidades</Text></Pressable>;
}
const styles = StyleSheet.create({ card: { backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 12, borderColor: '#e2e8f0', borderWidth: 1 }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }, nome: { fontSize: 17, fontWeight: '800', color: '#0f172a', flex: 1 }, price: { color: '#2563eb', fontWeight: '800' }, descricao: { color: '#64748b', marginVertical: 10 }, estoque: { color: '#475569', fontSize: 12 } });