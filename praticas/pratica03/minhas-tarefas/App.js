import { TextInput, StyleSheet, Text, View, Button } from 'react-native';
import { rotulo_input_meta, rotulo_btn_cadastro_meta, rotulo_lista_metas } from "./mensagens";
import { useState } from 'react';

export default function App() {

  const [inputMetaText, setInputMetaText] = useState("");
  const [metas, setMetas] = useState([]);

  function metaInputHandler(inputText){
    setInputMetaText(inputText)
  }

  function adicionarMetaHandler() {
    setMetas([...metas, inputMetaText])
  }

  return (
    <View style={styles.mainContainer}>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: "65%" }}>
          <TextInput onChangeText={metaInputHandler} style={styles.inputText} placeholder={rotulo_input_meta} />
        </View>

        <View style={{ width: "30%" }}>
          <Button onPress={adicionarMetaHandler} title={rotulo_btn_cadastro_meta} />
        </View>
      </View>

      <View style={styles.metaContainer}>
        <Text>{rotulo_lista_metas}</Text>
        {metas.map((meta, index) => <Text style={styles.item} key={index}>{meta}</Text>)}
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
  inputText: {
    borderColor: "#cccccc",
    borderWidth: 1,
  },
  metaContainer: {
    flex: 1,
  },
  item: {
    padding: 10,
    backgroundColor: "lightBlue",
    borderRadius: 5,
    marginTop: 5,
    color: "white"
  }
});
