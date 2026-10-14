import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { buscarProduto, cadastrarProduto, atualizarProduto } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import PrimaryButton from '../components/PrimaryButton';
export default function ProductFormScreen({ route, navigation }) {
  const id = route.params?.id;
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState('');
  useEffect(() => {
    if (!id) return;
    let active = true;
    buscarProduto(id).then((p) => {
      if (!active) return;
      setNome(p.nome); setDescricao(p.descricao); setPreco(String(p.preco).replace('.', ',')); setEstoque(String(p.estoque));
    }).catch((e) => { if (active) setErro(e.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);
  const salvar = async () => {
    const numeroPreco = Number(preco.trim().replace(',', '.'));
    const numeroEstoque = Number(estoque.trim());
    if (!nome.trim() || !preco.trim() || !estoque.trim()) return Alert.alert('Campos obrigatórios', 'Preencha nome, preço e estoque.');
    if (!Number.isFinite(numeroPreco) || numeroPreco < 0 || !Number.isInteger(numeroEstoque) || numeroEstoque < 0) return Alert.alert('Valores inválidos', 'Preço e estoque precisam ser números não negativos; estoque deve ser inteiro.');
    setSaving(true); setErro('');
    try {
      const dados = { nome: nome.trim(), descricao: descricao.trim(), preco: numeroPreco, estoque: numeroEstoque };
      if (id) await atualizarProduto(id, dados); else await cadastrarProduto(dados);
      Alert.alert('Sucesso', id ? 'Produto atualizado!' : 'Produto cadastrado!');
      navigation.goBack();
    } catch (e) { setErro(e.message); }
    finally { setSaving(false); }
  };
  if (loading) return <Loading texto="Buscando produto..." />;
  if (erro && id && !nome) return <ErrorMessage mensagem={erro} onRetry={() => navigation.goBack()} />;
  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}><ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <Text style={styles.title}>{id ? 'Atualizar informações' : 'Adicionar ao catálogo'}</Text>
    <Text style={styles.label}>Nome *</Text><TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex.: Mouse Gamer" maxLength={100} />
    <Text style={styles.label}>Descrição</Text><TextInput style={[styles.input, styles.multiline]} value={descricao} onChangeText={setDescricao} multiline placeholder="Descrição do produto" />
    <Text style={styles.label}>Preço (R$) *</Text><TextInput style={styles.input} value={preco} onChangeText={setPreco} keyboardType="decimal-pad" placeholder="Ex.: 99,90" />
    <Text style={styles.label}>Quantidade em estoque *</Text><TextInput style={styles.input} value={estoque} onChangeText={setEstoque} keyboardType="number-pad" placeholder="Ex.: 10" />
    {!!erro && <ErrorMessage mensagem={erro} />}
    <PrimaryButton title={id ? 'Salvar alterações' : 'Cadastrar produto'} onPress={salvar} disabled={saving} />
  </ScrollView></KeyboardAvoidingView>;
}
const styles = StyleSheet.create({ container: { padding: 20, paddingBottom: 40 }, title: { fontSize: 23, color: '#0f172a', fontWeight: '900', marginBottom: 18 }, label: { fontWeight: '700', color: '#334155', marginBottom: 8 }, input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 12, padding: 14, marginBottom: 18, fontSize: 16, color: '#0f172a' }, multiline: { height: 100, textAlignVertical: 'top' } });