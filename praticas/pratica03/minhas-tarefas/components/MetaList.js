import { Text, ScrollView } from 'react-native';
import { StyleSheet } from "react-native";

function MetaList(props) {
    return (
        <ScrollView style={styles.metaContainer}>
            {props.array.map((meta, index) => <Text style={styles.item} key={index}>{meta}</Text>)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    metaContainer: {
        flex: 10,
    },
    item: {
        padding: 10,
        backgroundColor: "#298aca",
        borderRadius: 5,
        marginTop: 5,
        color: "white"
    }
});

export default MetaList;