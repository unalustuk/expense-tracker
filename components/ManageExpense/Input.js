import { StyleSheet, Text, View, TextInput } from "react-native"
import React from "react"
import { GlobalStyles } from "../../constants/styles"

export default function Input({ label, invalid, textInputConfig, style }) {
    const inputStyles = [styles.input]

    if (textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }
    if (invalid) {
        inputStyles.push(styles.invalidInput)
    }
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>
                {label}
            </Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        color: GlobalStyles.colors.primary100,
        marginBottom: 8,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary800,
        padding: 8,
        borderRadius: 8,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50,
    },
})
