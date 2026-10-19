import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';
import { categorias, filtroTodos } from '../labels';

const CORES = {
  aula: '#1A365D',
  estudo: '#0E7C7B',
  trabalho: '#C27803',
  lazer: '#6C5CE7',
};

function formatarData(iso) {
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

function CompromissoItem({ item, onDelete, onToggle }) {
  const rotuloCategoria =
    categorias.find((cat) => cat.id === item.categoria)?.rotulo ?? item.categoria;

  return (
    <View style={styles.item}>
      <Pressable
        onPress={() => onToggle(item.id)}
        android_ripple={{ color: 'rgba(26,54,93,0.1)' }}
        style={({ pressed }) => [styles.itemBody, pressed && styles.pressed]}
      >
        <View style={styles.itemTopo}>
          <View
            style={[
              styles.badge,
              { backgroundColor: CORES[item.categoria] || '#1A365D' },
            ]}
          >
            <Text style={styles.badgeTexto}>{rotuloCategoria}</Text>
          </View>
          <Text style={styles.data}>{formatarData(item.criadoEm)}</Text>
        </View>
        <Text style={[styles.texto, item.concluido && styles.textoRiscado]}>
          {item.texto}
        </Text>
        <Text style={styles.dica}>
          {item.concluido ? 'Concluído — toque para reabrir' : 'Toque para concluir'}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onDelete(item.id)}
        android_ripple={{ color: 'rgba(196,30,58,0.18)' }}
        style={({ pressed }) => [styles.remover, pressed && styles.pressed]}
      >
        <Text style={styles.removerTexto}>Remover</Text>
      </Pressable>
    </View>
  );
}

export default function CompromissoList({
  itens,
  onDelete,
  onToggle,
  tituloLista,
  listaVazia,
  filtro,
  onChangeFiltro,
}) {
  const visiveis =
    filtro === 'todos'
      ? itens
      : itens.filter((item) => item.categoria === filtro);

  return (
    <View style={styles.listaArea}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <View style={styles.filtros}>
        <Pressable
          onPress={() => onChangeFiltro('todos')}
          android_ripple={{ color: 'rgba(26,54,93,0.12)' }}
          style={({ pressed }) => [
            styles.filtroChip,
            filtro === 'todos' && styles.filtroAtivo,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.filtroTexto, filtro === 'todos' && styles.filtroTextoAtivo]}>
            {filtroTodos}
          </Text>
        </Pressable>
        {categorias.map((cat) => {
          const ativo = filtro === cat.id;
          return (
            <Pressable
              key={cat.id}
              onPress={() => onChangeFiltro(cat.id)}
              android_ripple={{ color: 'rgba(26,54,93,0.12)' }}
              style={({ pressed }) => [
                styles.filtroChip,
                ativo && styles.filtroAtivo,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.filtroTexto, ativo && styles.filtroTextoAtivo]}>
                {cat.rotulo}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={visiveis}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CompromissoItem item={item} onDelete={onDelete} onToggle={onToggle} />
        )}
        ListEmptyComponent={
          <View style={styles.vazia}>
            <Text style={styles.vaziaTexto}>{listaVazia}</Text>
          </View>
        }
        contentContainerStyle={
          visiveis.length === 0 ? styles.vaziaContainer : styles.lista
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listaArea: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A365D',
    marginBottom: 10,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  filtroChip: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D7DEE8',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 6,
    overflow: 'hidden',
  },
  filtroAtivo: {
    backgroundColor: '#1A365D',
    borderColor: '#1A365D',
  },
  filtroTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A365D',
  },
  filtroTextoAtivo: {
    color: '#FFFFFF',
  },
  lista: {
    paddingBottom: 24,
  },
  vaziaContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  vazia: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  vaziaTexto: {
    textAlign: 'center',
    color: '#6B7C8D',
    fontSize: 14,
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E4EBF2',
    overflow: 'hidden',
  },
  itemBody: {
    padding: 14,
  },
  itemTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeTexto: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  data: {
    fontSize: 11,
    color: '#8A97A8',
  },
  texto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2B3C',
    marginBottom: 4,
  },
  textoRiscado: {
    textDecorationLine: 'line-through',
    color: '#6B7C8D',
    fontWeight: '500',
  },
  dica: {
    fontSize: 12,
    color: '#0E7C7B',
  },
  remover: {
    borderTopWidth: 1,
    borderTopColor: '#F0F3F7',
    paddingVertical: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  removerTexto: {
    color: '#C41E3A',
    fontWeight: '700',
    fontSize: 13,
  },
  pressed: {
    opacity: 0.85,
  },
});
