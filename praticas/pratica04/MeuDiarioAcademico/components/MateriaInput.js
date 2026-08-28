import { TextInput, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { btnText, inputText } from "../texts";

export function MateriaInput({ adicionarMateria, aoDigitar }) {
    return (
        <View style={styles.inputContainer}>
            <TextInput onChangeText={(text) => aoDigitar(text)} style={styles.inputText} placeholder={inputText} />

            <TouchableOpacity style={styles.btn} onPress={() => adicionarMateria()}>
                <Text style={styles.btnText}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 25
    },
    inputText: {
        borderColor: "#750909",
        borderWidth: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: "50%",
        backgroundColor: "#FFF",
        borderRadius: 15,
    },
    btn: {
        width: "25%",
        backgroundColor: "#1b61e2",
        alignItems: "center",
        justifyContent: "center",
        padding: 5
    },
    btnText: {
        color: "#FFF",
    }
})