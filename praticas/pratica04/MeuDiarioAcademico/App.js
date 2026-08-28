import { StyleSheet, View } from 'react-native';
import { MateriaInput } from './components/MateriaInput';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <MateriaInput />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: "column",
    padding: 25
  },
});
