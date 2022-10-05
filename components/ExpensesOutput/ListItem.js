import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { GlobalStyles } from "../../constants/styles"

export default function ListItem({ amount, descr, date }) {
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text>{descr}</Text>

                <Text>{date}</Text>
            </View>
            <View>
                <Text>{amount}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 16,
        backgroundColor: "white",
        marginBottom: 8,
        borderRadius: 8,
        justifyContent: "space-between",
        alignItems: "center",
    },
    infoContainer: {},
})
