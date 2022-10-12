import { View, Text, Pressable, StyleSheet } from "react-native"
import React from "react"
import { GlobalStyles } from "../../constants/styles"

export default function Button({ children, onPress, style, mode }) {
    return (
        <View style={style}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View
                    style={[
                        styles.buttonContainer,
                        mode === "flat" && styles.flat,
                    ]}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            mode === "flat" && styles.flatText,
                        ]}
                    >
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
    },
    buttonContainer: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    flat: {
        backgroundColor: "transparent",
    },
    buttonText: {
        textAlign: "center",
        color: "white",
    },
    flatText: {
        color: GlobalStyles.colors.error50,
    },
})
