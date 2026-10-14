import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { buscarProduto, excluirProduto } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import PrimaryButton from '../components/PrimaryButton';
import { moeda } from '../components/ProductCard';
export default function ProductDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [erro, setErro] = useState('');
  const carregar = useCallback(async () => {
    setLoading(true); setErro('');
    try { setProduto(await buscarProduto(id)); }
    catch (e) { setErro(e.message); }
    finally { setLoading(false); }
  }, [id]);
  useFocusEffect(useCallback(() => { carregar(); }, [carregar]));
  const remover = () => Alert.alert('Excluir produto?', 'Essa ação não pode ser desfeita.', [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: async () => {
      setDeleting(true);
      try { await excluirProduto(id); navigation.popToTop(); }
      catch (e) { Alert.alert('Erro ao excluir', e.message); }
      finally { setDeleting(false); }
    } },
  ]);
  if (loading) return <Loading />;
  if (erro) return <ErrorMessage mensagem={erro} onRetry={carregar} />;
  if (!produto) return <ErrorMessage mensagem="Produto não encontrado." onRetry={carregar} />;
  return <ScrollView contentContainerStyle={styles.container}><View style={styles.panel}>
    <Text style={styles.label}>PRODUTO #{produto.id}</Text><Text style={styles.nome}>{produto.nome}</Text><Text style={styles.price}>{moeda(produto.preco)}</Text>
    <Text style={styles.label}>DESCRIÇÃO</Text><Text style={styles.info}>{produto.descricao || 'Sem descrição'}</Text>
    <Text style={styles.label}>ESTOQUE</Text><Text style={styles.info}>{produto.estoque} unidades disponíveis</Text>
  </View><PrimaryButton title="Editar produto" onPress={() => navigation.navigate('Formulario', { id })} /><PrimaryButton danger title={deleting ? 'Excluindo...' : 'Excluir produto'} disabled={deleting} onPress={remover} /></ScrollView>;
}
const styles = StyleSheet.create({ container: { padding: 20 }, panel: { backgroundColor: '#fff', borderRadius: 16, padding: 22, marginBottom: 14 }, label: { marginBottom: 8, marginTop: 10, fontSize: 11, color: '#64748b', fontWeight: '800', letterSpacing: 1 }, nome: { fontSize: 28, fontWeight: '900', color: '#0f172a' }, price: { fontSize: 24, color: '#2563eb', fontWeight: '800', marginVertical: 16 }, info: { fontSize: 16, color: '#334155', marginBottom: 16 } });