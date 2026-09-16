import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import ProdutoCard from '../components/ProdutoCard';
import { produtos } from '../data/produtos';
import { colors } from '../theme/colors';
import { useCarrinho } from '../context/CarrinhoContext';

export default function CardapioTela({ navigation }) {
  // RNF02 — Carrinho vem do contexto compartilhado, não de estado local.
  const { adicionarItem, quantityOf, carrinhoCount } = useCarrinho();

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
      />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Cardápio</Text>

          <Text style={styles.subtitle}>
            Escolha seus itens favoritos
          </Text>
        </View>



        <Text style={styles.centerTitle}>
          Restaurante Bulhufas
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('Carrinho')}
        >
          <Ionicons name="cart-outline" size={26} color={colors.surface} />

          {carrinhoCount > 0 && (
            <View style={styles.contador}>
              <Text style={styles.contadorText}>
                {carrinhoCount > 99 ? '99+' : carrinhoCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>


      <FlatList
        data={produtos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProdutoCard
            produtos={item}
            quantity={quantityOf(item.id)}
            onAdd={adicionarItem}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  centerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.surface,
    paddingRight: 50
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.surface,
    
  },

  subtitle: {
    fontSize: 13,
    color: '#E0F7FA',
    marginTop: 2,
  },

  listContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },

  button: {
    padding: 6,
    position: 'relative',
  },

  contador: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    position: 'absolute',
    top: -2,
    right: -6,
  },

  contadorText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '700',
  },
});
