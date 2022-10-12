import { createContext, useReducer } from "react"

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2022-10-08"),
    },
    {
        id: "e2",
        description: "A pair of trousers",
        amount: 29.99,
        date: new Date("2022-10-06"),
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

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: (description, amount, date) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
})

function expensesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            const id = new Date().toString() + Math.random().toString()
            return [{ ...action.payload, id: id }, ...state]
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            )
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = { ...updatableExpense, ...action.payload.data }
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updatedItem
            return updatedExpenses
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(
        expensesReducer,
        DUMMY_EXPENSES
    )

    function addExpense(expenseData) {
        dispatch({ type: "ADD", payload: expenseData })
    }

    function deleteExpense(id) {
        dispatch({ type: "DELETE", payload: id })
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } })
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider
