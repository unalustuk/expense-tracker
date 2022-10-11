import { View, Text, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { GlobalStyles } from "../../constants/styles"

export default function ListItem({ amount, descr, date }) {
    const navigation = useNavigation()
    function expensePressHandler() {
        navigation.navigate("ManageExpense")
    }
    return (
        <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={expensePressHandler}
        >
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.descrText}>{descr}</Text>
                    <Text style={styles.dateText}>{date}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>{"$" + amount}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 8,
        backgroundColor: "white",
        marginBottom: 8,
        borderRadius: 8,
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3,
        shadowColor: "black",
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
    },
    pressed: {
        opacity: 0.8,
    },
    infoContainer: {
        paddingHorizontal: 8,
    },
    priceContainer: {
        minWidth: 80,
        backgroundColor: GlobalStyles.colors.primary800,
        padding: 12,
        borderRadius: 6,
    },
    priceText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
    descrText: { fontSize: 16, marginBottom: 2, fontWeight: "bold" },
    dateText: { fontSize: 16, fontWeight: "500" },
})
