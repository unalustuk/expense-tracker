import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"

import ManageExpense from "./screens/ManageExpense"
import RecentExpenses from "./screens/RecentExpenses"
import AllExpenses from "./screens/AllExpenses"
import { GlobalStyles } from "./constants/styles"
import IconButton from "./components/UI/IconButton"

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

function ExpensesOverView() {
    return (
        <BottomTabs.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "white",
                tabBarStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                headerRight: ({ size, tintColor }) => (
                    <IconButton
                        name="add"
                        color={tintColor}
                        size={24}
                        onPress={() => {
                            navigation.navigate("ManageExpense")
                        }}
                    />
                ),
            })}
        >
            <BottomTabs.Screen
                name="RecentExpenses"
                component={RecentExpenses}
                options={{
                    title: "Recent Expenses",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            size={size}
                            color={color}
                            name={"hourglass"}
                        />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="AllExpenses"
                component={AllExpenses}
                options={{
                    title: "All Expenses",
                    tabBarLabel: "All",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons size={size} color={color} name={"calendar"} />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    )
}

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: GlobalStyles.colors.primary500,
                        },
                        headerTintColor: "white",
                        tabBarStyle: {
                            backgroundColor: GlobalStyles.colors.primary500,
                        },
                        tabBarActiveTintColor: GlobalStyles.colors.accent500,
                    }}
                >
                    <Stack.Screen
                        name="ExpensesOverView"
                        component={ExpensesOverView}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ManageExpense"
                        component={ManageExpense}
                        // options={{ presentation: "modal" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}
