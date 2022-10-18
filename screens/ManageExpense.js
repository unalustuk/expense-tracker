import { View, Text, StyleSheet, TextInput } from "react-native"
import { useContext, useLayoutEffect } from "react"
import { GlobalStyles } from "../constants/styles"

import IconButton from "../components/UI/IconButton"
import { ExpensesContext } from "../store/expenses-context"
import ExpenseForm from "../components/ManageExpense/ExpenseForm"

export default function ManageExpense({ route, navigation }) {
    const expensesCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    )

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

    function confirmHandler(expenseData) {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData)
        } else {
            expensesCtx.addExpense(expenseData)
        }
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <ExpenseForm
                submitButtonLabel={isEditing ? "Update" : "Add"}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />

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
})
