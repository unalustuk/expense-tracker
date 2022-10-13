import { View, Text, StyleSheet, TextInput } from "react-native"
import { useContext, useLayoutEffect } from "react"
import { GlobalStyles } from "../constants/styles"

import IconButton from "../components/UI/IconButton"
import Button from "../components/UI/Button"
import { ExpensesContext } from "../store/expenses-context"
import ExpenseForm from "../components/ManageExpense/ExpenseForm"

export default function ManageExpense({ route, navigation }) {
    const expensesCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    useLayoutEffect(() => {
        navigation.setOptions(
            {
                title: isEditing ? "Edit Expense" : "Add Expense",
            },
            [navigation, isEditing]
        )
    })

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack()
    }

    function cancelHandler() {
        navigation.goBack()
    }

    function confirmHandler() {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, {
                description: "updated",
                amount: 119.99,
                date: new Date("2022-10-12"),
            })
        } else {
            expensesCtx.addExpense({
                description: "added",
                amount: 119.99,
                date: new Date("2022-10-12"),
            })
        }
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <ExpenseForm />
            <View style={styles.buttonsContainer}>
                <Button
                    mode="flat"
                    onPress={cancelHandler}
                    style={styles.buttonStyle}
                >
                    Cancel
                </Button>
                <Button onPress={confirmHandler} style={styles.buttonStyle}>
                    {isEditing ? "Update" : "Add"}
                </Button>
            </View>
            {isEditing && (
                <View style={styles.iconContainer}>
                    <IconButton
                        name={"trash"}
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },

    iconContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
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
