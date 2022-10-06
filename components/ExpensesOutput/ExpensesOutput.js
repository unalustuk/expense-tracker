import { View, StyleSheet } from "react-native"
import React from "react"
import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"
import { GlobalStyles } from "../../constants/styles"

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2021-12-19"),
    },
    {
        id: "e2",
        description: "A pair of trousers",
        amount: 29.99,
        date: new Date("2021-12-29"),
    },
    {
        id: "e3",
        description: "Banana",
        amount: 9.99,
        date: new Date("2021-12-01"),
    },
    {
        id: "e4",
        description: "Book",
        amount: 12.99,
        date: new Date("2021-12-15"),
    },
    {
        id: "e5",
        description: "Console",
        amount: 499.99,
        date: new Date("2021-12-17"),
    },
    {
        id: "e6",
        description: "Meal",
        amount: 18.99,
        date: new Date("2021-12-17"),
    },
    {
        id: "e7",
        description: "Meal",
        amount: 11.99,
        date: new Date("2021-12-12"),
    },
    {
        id: "e8",
        description: "Meal",
        amount: 11.99,
        date: new Date("2021-12-28"),
    },
]

export default function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
        <View style={styles.container}>
            <ExpensesSummary
                periodName={expensesPeriod}
                expenses={DUMMY_EXPENSES}
            />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
})
