import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import { useDebounce } from '../hooks/useDebounce';
import { getColors } from '../constants/theme';
import { CATEGORIES } from '../constants/categories';

function TodasDespesas() {
  const navigation = useNavigation();
  const { expenses, clearExpenses } = useExpenses();
  const colors = getColors(useColorScheme());
  const { width } = useWindowDimensions();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todas');
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();

    return expenses.filter((item) => {
      const matchesSearch = item.description.toLowerCase().includes(term);
      const matchesCategory =
        categoryFilter === 'todas' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, debouncedSearch, categoryFilter]);

  function handleClearAll() {
    Alert.alert(
      'Limpar tudo',
      'Deseja apagar todas as despesas? Esta acao nao pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: clearExpenses,
        },
      ]
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaSaida
        expenses={filtered}
        periodo="Total exibido"
        colors={colors}
        numColumns={width > 600 ? 2 : 1}
        emptyMessage={
          search || categoryFilter !== 'todas'
            ? 'Nenhuma despesa encontrada para esta busca.'
            : 'Nenhuma despesa. Toque em + para adicionar.'
        }
        onPressItem={(expenseId) =>
          navigation.navigate('GerenciarDespesa', { expenseId })
        }
        headerExtra={
          <View>
            <TextInput
              style={[
                styles.search,
                {
                  backgroundColor: colors.input,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              placeholder="Buscar por descricao"
              placeholderTextColor={colors.muted}
              value={search}
              onChangeText={setSearch}
            />

            <View style={styles.chips}>
              <Pressable
                onPress={() => setCategoryFilter('todas')}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      categoryFilter === 'todas' ? colors.primary : colors.chip,
                  },
                ]}
              >
                <Text
                  style={{
                    color: categoryFilter === 'todas' ? '#FFFFFF' : colors.text,
                    fontWeight: '600',
                    fontSize: 12,
                  }}
                >
                  Todas
                </Text>
              </Pressable>
              {CATEGORIES.map((category) => {
                const active = categoryFilter === category.id;
                return (
                  <Pressable
                    key={category.id}
                    onPress={() => setCategoryFilter(category.id)}
                    style={[
                      styles.chip,
                      { backgroundColor: active ? colors.primary : colors.chip },
                    ]}
                  >
                    <Text
                      style={{
                        color: active ? '#FFFFFF' : colors.text,
                        fontWeight: '600',
                        fontSize: 12,
                      }}
                    >
                      {category.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {expenses.length > 0 && (
              <Pressable onPress={handleClearAll} style={styles.clearButton}>
                <Text style={{ color: colors.danger, fontWeight: '700' }}>
                  Limpar tudo
                </Text>
              </Pressable>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    marginHorizontal: 12,
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  chip: {
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  clearButton: {
    alignItems: 'center',
    paddingVertical: 6,
  },
});

export default TodasDespesas;
