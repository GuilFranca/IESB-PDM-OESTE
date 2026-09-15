import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { categorias } from '../labels';

export default function CompromissoInput({
  value,
  onChangeText,
  onAdd,
  labels,
  categoria,
  onChangeCategoria,
}) {
  return (
    <View style={styles.form}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={labels.placeholderCompromisso}
          placeholderTextColor="#8A97A8"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />
        <Pressable
          onPress={onAdd}
          android_ripple={{ color: 'rgba(255,255,255,0.35)' }}
          style={({ pressed }) => [styles.botao, pressed && styles.pressed]}
        >
          <Text style={styles.botaoTexto}>{labels.botaoAdicionar}</Text>
        </Pressable>
      </View>

      <View style={styles.categorias}>
        {categorias.map((item) => {
          const ativo = categoria === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => onChangeCategoria(item.id)}
              android_ripple={{ color: 'rgba(26,54,93,0.15)' }}
              style={({ pressed }) => [
                styles.chip,
                ativo && styles.chipAtivo,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.chipTexto, ativo && styles.chipTextoAtivo]}>
                {item.rotulo}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '68%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7DEE8',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A2B3C',
  },
  botao: {
    width: '30%',
    backgroundColor: '#C41E3A',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  categorias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  chip: {
    flex: 1,
    marginHorizontal: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D7DEE8',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chipAtivo: {
    backgroundColor: '#1A365D',
    borderColor: '#1A365D',
  },
  chipTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A365D',
  },
  chipTextoAtivo: {
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.85,
  },
});
