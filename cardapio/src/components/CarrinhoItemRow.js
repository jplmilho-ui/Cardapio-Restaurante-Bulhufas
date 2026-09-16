import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { formatPrice } from '../utils/format';

// RF06 — Exibe um item do carrinho com botões "+"/"-" de quantidade.
// O "-" remove o item da lista automaticamente ao chegar a 0
// (a lógica de remoção mora no CarrinhoContext, este componente só dispara a ação).
export default function CarrinhoItemRow({ item, onIncrementar, onDecrementar }) {
  const subtotalItem = item.price * item.quantity;

  return (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.unitPrice}>{formatPrice(item.price)} / un.</Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.quantityButton}
            activeOpacity={0.8}
            onPress={() => onDecrementar(item.id)}
            accessibilityLabel={`Diminuir quantidade de ${item.name}`}
          >
            <Ionicons name="remove" size={16} color={colors.primary} />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            activeOpacity={0.8}
            onPress={() => onIncrementar(item.id)}
            accessibilityLabel={`Aumentar quantidade de ${item.name}`}
          >
            <Ionicons name="add" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subtotal}>{formatPrice(subtotalItem)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  unitPrice: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    minWidth: 28,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  subtotal: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 8,
  },
});
