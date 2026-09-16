import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';
import { formatPrice } from '../utils/format';

export default function ProdutoCard({ produtos, quantity = 0, onAdd }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: produtos.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
        {produtos.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {produtos.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(produtos.price)}</Text>

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={() => onAdd(produtos)}
          >
            <Text style={styles.addButtonText}>
              {quantity > 0 ? `Adicionar (${quantity})` : 'Adicionar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  addButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 12.5,
  },
});
