import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../services/api';


export default function EditProdutoScreen({ route, navigation }) {
    const { estoqueId } = route.params;

    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                // ALTERADO: Usa a instância 'api' para buscar o produto específico
                const response = await api.get(`/estoque/${estoqueId}`);
                const { nome, quantidade, preco } = response.data;
                setNome(nome);
                setQuantidade(String(quantidade));
                setPreco(String(preco));
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados do produto.');
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };
        fetchProduto();
    }, [estoqueId]);

    const handleUpdate = async () => {
        if (!nome || !quantidade || !preco) {
            Alert.alert('Atenção', 'Todos os campos são obrigatórios.');
            return;
        }
        try {
            // ALTERADO: Usa a instância 'api' para atualizar o produto
            await api.put(`/estoque/${estoqueId}`, {
                nome,
                quantidade: parseInt(quantidade),
                preco: parseFloat(preco)
            });
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o produto.');
            console.error(error);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#FFA500" />
                <Text style={styles.loadingText}>Carregando dados...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome do Produto</Text>
                <TextInput
                    value={nome}
                    onChangeText={setNome}
                    style={styles.input}
                    placeholder="Digite o nome do produto"
                    placeholderTextColor="#aaa"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Quantidade em Estoque</Text>
                <TextInput
                    value={quantidade}
                    onChangeText={setQuantidade}
                    style={styles.input}
                    placeholder="Digite a quantidade"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Preço (R$)</Text>
                <TextInput
                    value={preco}
                    onChangeText={setPreco}
                    style={styles.input}
                    placeholder="Digite o preço"
                    placeholderTextColor="#aaa"
                    keyboardType="decimal-pad"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF8F0',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8F0',
    },
    loadingText: {
        color: '#333',
        marginTop: 10,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        backgroundColor: '#fff',
        color: '#333',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});