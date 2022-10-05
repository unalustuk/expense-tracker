import { View, Text, StyleSheet } from "react-native"
import React from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"

export default function AllExpenses() {
    return <ExpensesOutput expenses={"Total"} />
}

const styles = StyleSheet.create({})
