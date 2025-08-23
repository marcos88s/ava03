import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

// ATENÇÃO: Substitua pelo IP da sua máquina ou URL da sua API
const API_URL = 'http://192.168.0.107:3000/estoque';

export default function ListaProdutoScreen({ navigation }) {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProdutos = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(API_URL);
            setProdutos(response.data);
        } catch (err) {
            setError('Não foi possível carregar os produtos.');
            console.error("Erro ao buscar produtos:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchProdutos();
        });
        return unsubscribe;
    }, [navigation]);

    const handleDelete = (id) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir este produto?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            await axios.delete(`${API_URL}/${id}`);
                            fetchProdutos();
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível excluir o produto.');
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#FFA500" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.button} onPress={fetchProdutos}>
                    <Text style={styles.buttonText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardBody}>
                            <Text style={styles.itemName}>{item.nome}</Text>
                            <Text style={styles.itemDetail}>Quantidade: {item.quantidade}</Text>
                            <Text style={styles.itemPrice}>Preço: R$ {parseFloat(item.preco).toFixed(2)}</Text>
                        </View>
                        <View style={styles.cardActions}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.editButton]}
                                onPress={() => navigation.navigate('EditProduto', { estoqueId: item.id })}
                            >
                                <Text style={styles.actionButtonText}>EDITAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.deleteButton]}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.actionButtonText}>APAGAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListHeaderComponent={
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('AddProduto')}
                    >
                        <Text style={styles.addButtonText}>+ Adicionar Novo Produto</Text>
                    </TouchableOpacity>
                }
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF8F0',
        paddingHorizontal: 15,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8F0',
        paddingHorizontal: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: '#D32F2F',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#FFA500',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#FFA500',
        padding: 16,
        borderRadius: 8,
        marginVertical: 15,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardBody: {
        marginBottom: 15,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    itemDetail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        color: '#E67E22',
        fontWeight: '600',
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 15,
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginLeft: 10,
    },
    editButton: {
        backgroundColor: '#FFA500',
    },
    deleteButton: {
        backgroundColor: '#FF7F50',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    }
});