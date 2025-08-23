import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

// ATENÇÃO: Substitua pelo IP da sua máquina ou URL da sua API
const API_URL = 'http://192.168.0.107:3000/estoque';

export default function AddProdutoScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');

    const handleAddProduto = async () => {
        if (!nome || !quantidade || !preco) {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
            return;
        }
        try {
            await axios.post(API_URL, {
                nome,
                quantidade: parseInt(quantidade),
                preco: parseFloat(preco)
            });
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível adicionar o produto.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome do Produto</Text>
                <TextInput
                    value={nome}
                    onChangeText={setNome}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Quantidade em Estoque</Text>
                <TextInput
                    value={quantidade}
                    onChangeText={setQuantidade}
                    style={styles.input}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Preço (R$)</Text>
                <TextInput
                    value={preco}
                    onChangeText={setPreco}
                    style={styles.input}
                    keyboardType="decimal-pad"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleAddProduto}>
                <Text style={styles.buttonText}>Salvar Produto</Text>
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