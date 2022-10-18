import { View, Text, StyleSheet, Alert } from "react-native"
import React, { useState } from "react"
import Input from "./Input"
import Button from "../UI/Button"
import { GlobalStyles } from "../../constants/styles"

export default function ExpenseForm({
    submitButtonLabel,
    onCancel,
    onSubmit,
    defaultValues,
}) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : "",
            isValid: true,
        },
        date: {
            value: defaultValues
                ? defaultValues.date.toISOString().slice(0, 10)
                : "",
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : "",
            isValid: true,
        },
    })

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        }

        const amountIsValid =
            !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() === "Invalid Date"
        const descriptionIsValid = expenseData.description.trim().length > 0

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((prevState) => {
                return {
                    amount: {
                        value: prevState.amount.value,
                        isValid: amountIsValid,
                    },
                    date: { value: prevState.date.value, isValid: dateIsValid },
                    description: {
                        value: prevState.description.value,
                        isValid: descriptionIsValid,
                    },
                }
            })

            return
        }
        onSubmit(expenseData)
    }
    function inputChangeHandler(inputId, enteredValue) {
        setInputs((prevState) => {
            return {
                ...prevState,
                [inputId]: { value: enteredValue, isValid: true },
            }
        })
    }
    const formIsInvalid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.numberContainer}>
                <Input
                    label={"Amount"}
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangeHandler.bind(this, "amount"),
                        value: inputs.amount.value,
                    }}
                    style={styles.inputStyle}
                />
                <Input
                    label={"Date"}
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, "date"),
                        value: inputs.date.value,
                    }}
                    style={styles.inputStyle}
                />
            </View>
            <Input
                label={"Description"}
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, "description"),
                    value: inputs.description.value,
                }}
            />
            {formIsInvalid && (
                <Text style={styles.errorText}>Form invalid</Text>
            )}
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
    form: {},
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
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8,
        fontSize: 18,
    },
})
