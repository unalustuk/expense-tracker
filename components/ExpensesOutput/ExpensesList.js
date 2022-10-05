import { FlatList, StyleSheet, Text, View } from "react-native"
import Moment from "moment"
import React from "react"
import ListItem from "./ListItem"

function renderExpenseItem(itemData) {
    const item = itemData.item

    const date = Moment(item.date).format("Do MMM YYYY")
    return (
        <ListItem amount={item.amount} descr={item.description} date={date} />
    )
}

export default function ExpensesList({ expenses }) {
    return (
        <View style={styles.listContainer}>
            <FlatList
                data={expenses}
                renderItem={renderExpenseItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    listContainer: { paddingVertical: 8 },
})
