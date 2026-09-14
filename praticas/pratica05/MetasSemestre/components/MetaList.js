import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

function formatarData(iso) {
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

function MetaItem({ item, onDelete, onToggle }) {
  return (
    <View style={[styles.card, item.concluida && styles.cardConcluida]}>
      <Pressable
        onPress={() => onToggle(item.id)}
        android_ripple={{ color: 'rgba(14,124,123,0.12)' }}
        style={({ pressed }) => [styles.cardBody, pressed && styles.pressed]}
      >
        <Text style={[styles.texto, item.concluida && styles.textoRiscado]}>
          {item.texto}
        </Text>
        <Text style={styles.data}>Criada em {formatarData(item.criadaEm)}</Text>
        <Text style={styles.dica}>
          {item.concluida ? 'Concluída — toque para reabrir' : 'Toque para marcar como concluída'}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onDelete(item.id)}
        android_ripple={{ color: 'rgba(192,57,43,0.2)' }}
        style={({ pressed }) => [styles.deleteBtn, pressed && styles.pressed]}
      >
        <Text style={styles.deleteText}>Remover</Text>
      </Pressable>
    </View>
  );
}

export default function MetaList({ metas, onDelete, onToggle }) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MetaItem item={item} onDelete={onDelete} onToggle={onToggle} />
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Nenhuma meta ainda</Text>
          <Text style={styles.emptyText}>
            Cadastre a primeira meta de estudo do semestre.
          </Text>
        </View>
      }
      contentContainerStyle={metas.length === 0 ? styles.emptyContainer : styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2B3C',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7C8D',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E4EBF2',
  },
  cardConcluida: {
    backgroundColor: '#F4FAF9',
    borderColor: '#CDE8E6',
  },
  cardBody: {
    padding: 14,
  },
  pressed: {
    opacity: 0.85,
  },
  texto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2B3C',
    marginBottom: 6,
  },
  textoRiscado: {
    textDecorationLine: 'line-through',
    color: '#6B7C8D',
    fontWeight: '500',
  },
  data: {
    fontSize: 12,
    color: '#8A9AAB',
    marginBottom: 4,
  },
  dica: {
    fontSize: 12,
    color: '#0E7C7B',
  },
  deleteBtn: {
    borderTopWidth: 1,
    borderTopColor: '#F0F3F7',
    paddingVertical: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  deleteText: {
    color: '#C0392B',
    fontWeight: '700',
    fontSize: 13,
  },
});
