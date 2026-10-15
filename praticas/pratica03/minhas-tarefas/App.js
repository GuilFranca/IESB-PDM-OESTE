import { TextInput, StyleSheet, Text, View } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_lista_metas } from "./mensagens";
import { useState } from 'react';
import MetaList from './components/MetaList';
import { MetaInput } from './components/MetaInput';

export default function App() {

  const [inputMetaText, setInputMetaText] = useState("");
  const [metas, setMetas] = useState([]);

  function metaInputHandler(inputText) {
    setInputMetaText(inputText)
  }

  function adicionarMetaHandler() {
    setMetas([...metas, inputMetaText])
  }

  return (
    <View style={styles.mainContainer}>

      <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
        <MetaInput
          aoApertar={adicionarMetaHandler}
          titulo={rotulo_btn_cadastro_meta}
          aoDigitar={metaInputHandler}
        />
      </View>

      <View style={styles.metaContainer}>
        <Text>{rotulo_lista_metas}</Text>
        <MetaList array={metas} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: "column"
  },
  metaContainer: {
    flex: 10,
  },
});
