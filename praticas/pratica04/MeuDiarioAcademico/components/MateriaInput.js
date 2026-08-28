import { TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { btnText, inputText } from "../texts";

export function MateriaInput() {
    return(
        <view style={styles.inputContainer}>
            <TextInput style={styles.inputText} placeholder={inputText}/>

            <TouchableOpacity style={styles.btn} onPress={() => {}}>
                <Text style={styles.btnText}>{btnText}</Text>
            </TouchableOpacity>
        </view>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: "row"
    },
    inputText: {
        borderColor: "#cccccc",
        borderWidth: 1,
        padding: 5,
        width: "50%",
    },
    btn: {
        width: "50%",
        backgroundColor: "#1b61e2",
        alignItems: "center",
        padding: 5
    },
    btnText: {
        color: "#FFF",
    } 
})