import { StyleSheet, Text, View } from "react-native";
import { listText } from "../texts";

export function MateriaList({ materias }) {
    return (
        <View style={styles.listContainer}>
            <Text style={styles.listText} >{listText}</Text>
            {materias.map((materia, index) =>
                <Text
                    style={styles.materiasText}
                    key={index}
                >
                    {materia}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    listText: {
        color: "#ecf3f3",
        fontWeight: 600,
        fontSize: 24
    },
    listContainer: {
        flexDirection: "column",
        gap: 10
    },
    materiasText: {
        backgroundColor: "#1152dd",
        padding: 10,
        borderRadius: 5,
        borderLeftWidth: 4,
        borderLeftColor: "#750909",
        color: "#FFF"
    }
})