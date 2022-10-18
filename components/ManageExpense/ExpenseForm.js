import { View, Text, StyleSheet, Alert } from "react-native"
import React, { useState } from "react"
import Input from "./Input"
import Button from "../UI/Button"

export default function ExpenseForm({
    submitButtonLabel,
    onCancel,
    onSubmit,
    defaultValues,
}) {
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : "",
        date: defaultValues
            ? defaultValues.date
                  .toISOString()
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")
            : "",
        description: defaultValues ? defaultValues.description : "",
    })

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description,
        }

        const amountIsValid =
            !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() === "Invalid Date"
        const descriptionIsValid = expenseData.description.trim().length > 0

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            Alert.alert("Invalid input", "check input values")
            return
        }
        onSubmit(expenseData)
    }
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
            <View style={styles.buttonsContainer}>
                <Button
                    mode="flat"
                    onPress={onCancel}
                    style={styles.buttonStyle}
                >
                    Cancel
                </Button>
                <Button onPress={submitHandler} style={styles.buttonStyle}>
                    {submitButtonLabel}
                </Button>
            </View>
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
    buttonStyle: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
})
