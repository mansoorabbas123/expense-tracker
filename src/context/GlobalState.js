import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  transactions: [],
  expenses: [],
  budget: 500,
  search: {type:"expense",value:""}
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  console.log("global state::", state);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function updateBudgetHanler(amount) {
    dispatch({
      type: "UPDATE_BUDGET",
      payload: amount,
    });
  }

  function handleSearch (type,value="") {
    dispatch({
        type:"SEARCH",
        payload: {type,value}
    })
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  function addExpenses(expense) {
    dispatch({
      type: "ADD_EXPENSES",
      payload: expense,
    });
  }

  function deleteExpenses(id) {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        budget: state.budget,
        expenses: state.expenses,
        deleteTransaction,
        addTransaction,
        updateBudgetHanler,
        addExpenses,
        deleteExpenses,
        search:state.search,
        handleSearch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
