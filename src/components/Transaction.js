import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split(".");
  return (
    "$ " +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "") +
    "." +
    p[1]
  );
}

export const Transaction = ({ transaction, variant }) => {
  const { deleteTransaction, deleteExpenses } = useContext(GlobalContext);

  if (variant === "expense") {
    return (
      <li className="minus">
        {transaction.text}{" "}
        <span>
          {"-"}
          {moneyFormatter(transaction.amount)}
        </span>
        <button
          onClick={() => deleteExpenses(transaction.id)}
          className="delete-btn"
        >
          x
        </button>
      </li>
    );
  }

  return (
    <li className="plus">
      {transaction.text}{" "}
      <span>
        {"+"}
        {moneyFormatter(transaction.amount)}
      </span>
      <button
        onClick={() => deleteTransaction(transaction.id)}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};
