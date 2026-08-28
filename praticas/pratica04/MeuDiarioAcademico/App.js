import { StyleSheet, View } from 'react-native';
import { MateriaInput } from './components/MateriaInput';
import { MateriaList } from './components/MateriList';
import { useState } from 'react';

export default function App() {
  const [inputMetaText, setInputMetaText] = useState("");
  const [materias, setMaterias] = useState([]);

  function aoDigitar(inputText) {
    setInputMetaText(inputText)
  }

  function adicionarMateria() {
    if (!inputMetaText) return
    setMaterias([
      ...materias,
      inputMetaText
    ]);
  }

  return (
    <View style={styles.mainContainer}>
      <MateriaInput adicionarMateria={adicionarMateria} aoDigitar={aoDigitar}/>
      <MateriaList materias={materias} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1d1c1b',
    flexDirection: "column",
    padding: 25,
    gap: 25
  },
});
