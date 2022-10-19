import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native"
import { useContext, useLayoutEffect } from "react"
import { GlobalStyles } from "../constants/styles"

import IconButton from "../components/UI/IconButton"
import { ExpensesContext } from "../store/expenses-context"
import ExpenseForm from "../components/ManageExpense/ExpenseForm"
import { storeExpense, updateExpense, deleteExpense } from "../util/http"

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

    async function deleteExpenseHandler() {
        await deleteExpense(editedExpenseId)
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack()
    }

    function cancelHandler() {
        navigation.goBack()
    }

    async function confirmHandler(expenseData) {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData)
            await updateExpense(editedExpenseId, expenseData)
        } else {
            const id = await storeExpense(expenseData)
            expensesCtx.addExpense({ ...expenseData, id: id })
        }
        navigation.goBack()
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
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
