import React from 'react';
import { Alert, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CarrinhoItemRow from '../components/CarrinhoItemRow';
import { colors } from '../theme/colors';
import { formatPrice } from '../utils/format';
import { useCarrinho } from '../context/CarrinhoContext';

export default function CarrinhoTela({ navigation }) {
  // RNF02 — Mesmo estado de carrinho usado na tela de Cardápio (contexto compartilhado).
  const { items, incrementarItem, decrementarItem, subtotal, taxaEntrega, total } =
    useCarrinho();

  const carrinhoVazio = items.length === 0;

  // RF09 — Botão "Continuar": segue para o fechamento do pedido.
  // A tela de checkout ainda não existe (RF04 fica para a próxima etapa),
  // então por enquanto só confirmamos que os dados do carrinho estão corretos.
  const handleContinuar = () => {
    Alert.alert(
      'Continuar',
      `Pedido com ${items.length} item(ns).\nTotal: ${formatPrice(total)}\n\n` +
        'A tela de fechamento de pedido ainda será implementada na próxima etapa (RF04).'
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Voltar para o cardápio"
        >
          <Ionicons name="arrow-back" size={22} color={colors.surface} />
        </TouchableOpacity>

        <Text style={styles.title}>Seu carrinho</Text>

        {/* Espaçador para manter o título centralizado */}
        <View style={styles.backButton} />
      </View>

      {carrinhoVazio ? (
        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={56} color={colors.border} />
          <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>
          <Text style={styles.emptySubtitle}>
            Volte ao cardápio e adicione alguns itens deliciosos.
          </Text>

          <TouchableOpacity
            style={styles.emptyButton}
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.emptyButtonText}>Ver cardápio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <CarrinhoItemRow
                item={item}
                onIncrementar={incrementarItem}
                onDecrementar={decrementarItem}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.summary}>
            {/* RF07 — Subtotal */}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
            </View>

            {/* RF08 — Taxa fixa de entrega */}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxa de entrega</Text>
              <Text style={styles.summaryValue}>{formatPrice(taxaEntrega)}</Text>
            </View>

            <View style={styles.divider} />

            {/* RF08 — Total = subtotal + taxa de entrega */}
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>

            {/* RF09 — Botão Continuar */}
            <TouchableOpacity
              style={styles.continueButton}
              activeOpacity={0.85}
              onPress={handleContinuar}
            >
              <Text style={styles.continueButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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

  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.surface,
    p
  },

  listContent: {
    paddingTop: 16,
    paddingBottom: 8,
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
  },

  emptySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },

  emptyButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  emptyButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 14,
  },

  summary: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },

  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },

  continueButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  continueButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 15,
  },
});
