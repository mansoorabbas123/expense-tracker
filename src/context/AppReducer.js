export default (state, action) => {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        // budget: state.budget+action.payload.amount,
      };

    case "ADD_EXPENSES":
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
      };
    case "UPDATE_BUDGET":
      return {
        ...state,
        budget: action.payload,
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
