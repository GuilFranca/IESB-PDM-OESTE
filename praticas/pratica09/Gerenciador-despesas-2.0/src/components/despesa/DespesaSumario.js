import { View, Text, StyleSheet } from 'react-native';

function DespesaSumario({ expenses, periodo, colors }) {
  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const quantity = expenses.length;
  const label = quantity === 1 ? 'despesa' : 'despesas';

  return (
    <View style={[styles.container, { backgroundColor: colors.chip, borderColor: colors.border }]}>
      <View>
        <Text style={[styles.periodo, { color: colors.muted }]}>{periodo}</Text>
        <Text style={[styles.quantity, { color: colors.text }]}>
          {quantity} {label}
        </Text>
      </View>
      <Text style={[styles.total, { color: colors.accent }]}>R$ {total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  periodo: {
    fontSize: 12,
    fontWeight: '600',
  },
  quantity: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  total: {
    fontSize: 18,
    fontWeight: '800',
  },
});

export default DespesaSumario;
