import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProductFormScreen from '../screens/ProductFormScreen';
const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#f8fafc' }, headerTintColor: '#0f172a', headerTitleStyle: { fontWeight: 'bold' }, contentStyle: { backgroundColor: '#f1f5f9' } }}>
    <Stack.Screen name="Produtos" component={ProductListScreen} options={{ title: 'Meus produtos' }} />
    <Stack.Screen name="Detalhes" component={ProductDetailsScreen} options={{ title: 'Detalhes do produto' }} />
    <Stack.Screen name="Formulario" component={ProductFormScreen} options={({ route }) => ({ title: route.params?.id ? 'Editar produto' : 'Novo produto' })} />
  </Stack.Navigator>;
}