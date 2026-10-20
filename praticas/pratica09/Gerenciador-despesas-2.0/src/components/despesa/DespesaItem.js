import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { getCategoryLabel } from '../../constants/categories';

function getFormattedDate(date) {
  return (
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  );
}

function DespesaItem({ item, colors, onPress, compact }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(26,54,93,0.12)' }}
      style={({ pressed }) => [pressed && styles.pressed, compact && styles.compact]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
          compact && styles.cardCompact,
        ]}
      >
        <View style={styles.row}>
          <Text style={[styles.description, { color: colors.text }]} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={[styles.amount, { color: colors.accent }]}>
            R$ {Number(item.amount).toFixed(2)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.meta, { color: colors.muted }]}>
            {getFormattedDate(item.date)}
          </Text>
          <Text style={[styles.category, { color: colors.primary }]}>
            {getCategoryLabel(item.category)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardCompact: {
    marginHorizontal: 6,
  },
  compact: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  description: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
  },
  amount: {
    fontSize: 15,
    fontWeight: '800',
  },
  meta: {
    fontSize: 12,
    marginTop: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  pressed: {
    opacity: 0.85,
  },
});

export default DespesaItem;
