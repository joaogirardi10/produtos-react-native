import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { listarProdutos } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import ProductCard from '../components/ProductCard';
import PrimaryButton from '../components/PrimaryButton';
export default function ProductListScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState('');
  const carregar = useCallback(async (refresh = false) => {
    if (refresh) setRefreshing(true); else setLoading(true);
    setErro('');
    try { setProdutos(await listarProdutos()); }
    catch (e) { setErro(e.message); }
    finally { setLoading(false); setRefreshing(false); }
  }, []);
  useFocusEffect(useCallback(() => { carregar(); }, [carregar]));
  return <View style={styles.container}>
    <View style={styles.header}><Text style={styles.heading}>Catálogo de produtos</Text><Text style={styles.subtitle}>Cadastre e gerencie seu estoque</Text><PrimaryButton title="+ Cadastrar produto" onPress={() => navigation.navigate('Formulario')} /></View>
    {loading ? <Loading /> : erro ? <ErrorMessage mensagem={erro} onRetry={() => carregar()} /> :
      <FlatList data={produtos} keyExtractor={(item) => String(item.id)} contentContainerStyle={styles.list} renderItem={({ item }) => <ProductCard produto={item} onPress={() => navigation.navigate('Detalhes', { id: item.id })} />} ListEmptyComponent={<Text style={styles.empty}>Nenhum produto cadastrado.</Text>} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => carregar(true)} />} />}
  </View>;
}
const styles = StyleSheet.create({ container: { flex: 1 }, header: { padding: 20, paddingBottom: 6 }, heading: { fontSize: 23, fontWeight: '900', color: '#0f172a' }, subtitle: { color: '#64748b', marginTop: 4, marginBottom: 10 }, list: { paddingHorizontal: 20, paddingVertical: 12, flexGrow: 1 }, empty: { color: '#64748b', textAlign: 'center', marginTop: 30 } });