import { useMemo } from 'react';
import { View, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import { getColors } from '../constants/theme';

function getLast7Days(expenses) {
  const now = new Date();
  const start = new Date();
  start.setDate(now.getDate() - 7);
  start.setHours(0, 0, 0, 0);

  return expenses.filter((item) => item.date >= start && item.date <= now);
}

function DespesasRecentes() {
  const navigation = useNavigation();
  const { expenses } = useExpenses();
  const colors = getColors(useColorScheme());
  const { width } = useWindowDimensions();
  const recent = useMemo(() => getLast7Days(expenses), [expenses]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaSaida
        expenses={recent}
        periodo="Ultimos 7 dias"
        colors={colors}
        numColumns={width > 600 ? 2 : 1}
        emptyMessage="Nenhuma despesa nos ultimos 7 dias. Toque em + para adicionar."
        onPressItem={(expenseId) =>
          navigation.navigate('GerenciarDespesa', { expenseId })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DespesasRecentes;
