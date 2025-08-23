// app-cursos/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Renomeie 'ListaCursos.js' para 'ListaCursosScreen.js' e mova para 'src/screens'
import ListaProdutosScreen from './src/screens/ListaProdutosScreen';
import AddProdutoScreen from './src/screens/AddProdutoScreen';
import EditProdutoScreen from './src/screens/EditProdutoScreen'; // 1. Importar a nova tela

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaProduto">
        <Stack.Screen name="ListaProduto" component={ListaProdutosScreen} options={{ title: 'Produtos' }} />
        <Stack.Screen name="AddProduto" component={AddProdutoScreen} options={{ title: 'Adicionar Novo Produto' }} />
        <Stack.Screen name="EditProduto" component={EditProdutoScreen} options={{ title: 'Editar Produto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}