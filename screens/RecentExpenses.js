import { View, Text, StyleSheet } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../util/date"
import { fetchExpenses } from "../util/http"
import LoadingOverlay from "../components/UI/LoadingOverlay"

export default function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true)

    const expensesCtx = useContext(ExpensesContext)

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true)
            const expenses = await fetchExpenses()
            expensesCtx.setExpenses(expenses)
            setIsFetching(false)
        }

        getExpenses()
    }, [])

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date()
        const date7DaysAgo = getDateMinusDays(today, 7)
        return expense.date > date7DaysAgo && expense.date <= today
    })
    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod={"Last 7 Days"}
            fallbackText={"No expenses registered for last 7 days"}
        />
    )
}

const styles = StyleSheet.create({})
