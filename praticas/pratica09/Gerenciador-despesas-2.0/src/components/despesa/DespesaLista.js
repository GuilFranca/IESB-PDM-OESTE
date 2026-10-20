import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';

function EmptyList({ colors, message }) {
  return (
    <View style={styles.empty}>
      <Ionicons name="receipt-outline" size={48} color={colors.muted} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>Nenhuma despesa</Text>
      <Text style={[styles.emptyText, { color: colors.muted }]}>
        {message || 'Toque em + para adicionar.'}
      </Text>
    </View>
  );
}

function DespesaLista({
  expenses,
  colors,
  onPressItem,
  header,
  emptyMessage,
  numColumns = 1,
}) {
  return (
    <FlatList
      key={numColumns}
      data={expenses}
      numColumns={numColumns}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DespesaItem
          item={item}
          colors={colors}
          compact={numColumns > 1}
          onPress={() => onPressItem(item.id)}
        />
      )}
      ListHeaderComponent={header}
      ListEmptyComponent={<EmptyList colors={colors} message={emptyMessage} />}
      contentContainerStyle={expenses.length === 0 ? styles.emptyContainer : styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 12,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
});

export default DespesaLista;
