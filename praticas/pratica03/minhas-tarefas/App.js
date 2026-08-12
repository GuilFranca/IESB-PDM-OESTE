import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { titulo } from './util';
import titulo_padrao from "./util";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{titulo}</Text>
      <Text style={{margin: 20}} >{titulo_padrao}</Text>
      <Button title="Clique Aqui"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: "red",
    fontSize: 26,
  }
});
