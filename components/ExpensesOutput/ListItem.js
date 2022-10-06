import { View, Text, StyleSheet, Pressable } from "react-native"
import React from "react"
import { GlobalStyles } from "../../constants/styles"

export default function ListItem({ amount, descr, date }) {
    return (
        <Pressable
            style={({ pressed }) => {
                return pressed ? styles.pressed : ""
            }}
        >
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.descrText}>{descr}</Text>
                    <Text style={styles.dateText}>{date}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>{"$" + amount}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 8,
        backgroundColor: "white",
        marginBottom: 8,
        borderRadius: 8,
        justifyContent: "space-between",
        alignItems: "center",
    },
    pressed: {
        opacity: 0.8,
    },
    infoContainer: {
        paddingHorizontal: 8,
    },
    priceContainer: {
        backgroundColor: GlobalStyles.colors.primary800,
        padding: 12,
        borderRadius: 6,
    },
    priceText: { color: "white", fontWeight: "bold", fontSize: 16 },
    descrText: { fontSize: 16, marginBottom: 2 },
    dateText: { fontWeight: "bold" },
})
