import { View, Text, StyleSheet } from "react-native"
import React from "react"
import Input from "./Input"

export default function ExpenseForm() {
    function amountChangedHandler() {}
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.numberContainer}>
                <Input
                    label={"Amount"}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: amountChangedHandler,
                    }}
                    style={styles.inputStyle}
                />
                <Input
                    label={"Date"}
                    textInputConfig={{
                        placeholder: "DD-MM-YYYY",
                        maxLength: 10,
                        onChangeText: () => {},
                    }}
                    style={styles.inputStyle}
                />
            </View>
            <Input
                label={"Description"}
                textInputConfig={{
                    multiline: true,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form: { marginTop: 40 },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginVertical: 24,
    },
    numberContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputStyle: {
        flex: 1,
    },
})
