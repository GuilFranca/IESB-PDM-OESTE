import { View, Button, StyleSheet, TextInput } from 'react-native';
import { rotulo_input_meta } from "../mensagens";

export function MetaInput({ aoApertar, titulo, aoDigitar }) {
    return (
        <>
            <View style={{ width: "65%" }}>
                <TextInput onChangeText={(text) => aoDigitar(text)} style={styles.inputText} placeholder={rotulo_input_meta} />
            </View>

            <View style={{ width: "30%" }}>
                <Button onPress={() => aoApertar()} title={titulo} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    inputText: {
        borderColor: "#cccccc",
        borderWidth: 1,
    },
})