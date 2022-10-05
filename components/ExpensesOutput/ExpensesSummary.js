import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { GlobalStyles } from "../../constants/styles"

export default function ExpensesSummary({ periodName, expenses }) {
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0)
    return (
        <View style={styles.summaryContainer}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>{`$` + expensesSum.toFixed(2)}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    summaryContainer: {
        padding: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 8,
    },
    period: {
        fontSize: 14,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 18,
        fontWeight: "bold",
        color: GlobalStyles.colors.primary500,
    },
})
