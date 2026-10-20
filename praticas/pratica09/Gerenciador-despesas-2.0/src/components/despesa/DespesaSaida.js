import { View, StyleSheet } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

function DespesaSaida({
  expenses,
  periodo,
  colors,
  onPressItem,
  emptyMessage,
  headerExtra,
  numColumns,
}) {
  return (
    <View style={styles.container}>
      {headerExtra}
      <DespesaLista
        expenses={expenses}
        colors={colors}
        onPressItem={onPressItem}
        emptyMessage={emptyMessage}
        numColumns={numColumns}
        header={
          <DespesaSumario expenses={expenses} periodo={periodo} colors={colors} />
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

export default DespesaSaida;
