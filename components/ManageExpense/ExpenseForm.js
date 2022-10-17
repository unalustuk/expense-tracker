import { View, Text, StyleSheet } from "react-native"
import React, { useState } from "react"
import Input from "./Input"

export default function ExpenseForm() {
    const [inputValues, setInputValues] = useState({
        amount: "",
        date: "",
        description: "",
    })
    function inputChangeHandler(inputId, enteredValue) {
        setInputValues((prevState) => {
            return {
                ...prevState,
                [inputId]: enteredValue,
            }
        })
    }
    console.log(inputValues)
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.numberContainer}>
                <Input
                    label={"Amount"}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangeHandler.bind(this, "amount"),
                        value: inputValues.amount,
                    }}
                    style={styles.inputStyle}
                />
                <Input
                    label={"Date"}
                    textInputConfig={{
                        placeholder: "DD-MM-YYYY",
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, "date"),
                        value: inputValues.date,
                    }}
                    style={styles.inputStyle}
                />
            </View>
            <Input
                label={"Description"}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, "description"),
                    value: inputValues.description,
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
