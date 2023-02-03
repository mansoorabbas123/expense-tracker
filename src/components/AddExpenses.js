import React, { useState, useContext } from "react";
import { CloseButton } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
import ModalComp from "./ModalComp";

export const AddExpenses = ({ setActiveForm }) => {
  const { transactions, expenses } = useContext(GlobalContext);
  const [modalShow, setModalShow] = useState(false);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const total_amounts = transactions.map((transaction) => transaction.amount);
  const total_expenses = expenses.map((expense) => expense.amount);
  const remaining = total_amounts.reduce((acc, item) => (acc += item), 0);
  const expense =
    total_expenses
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1;
  console.log("expense", expense);
  const total_remaining = remaining - expense;

  const { addExpenses } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (amount > total_remaining) {
      setModalShow(true);
    } else {
      const newTransaction = {
        id: Math.floor(Math.random() * 100000000),
        text,
        amount: -amount,
      };
      console.log("newTrnsaction:", newTransaction);

      addExpenses(newTransaction);
      setActiveForm(null);
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{ backgroundColor: "#fff" }}
        className="px-3 pb-4"
      >
        <div className="d-flex justify-content-end p-3">
          <CloseButton onClick={() => setActiveForm(null)} />
        </div>

        <div className="form-control" style={{ border: "none" }}>
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control" style={{ border: "none" }}>
          <label htmlFor="amount">
            Amount <br />
            (amount you spend)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button
          className="btn"
          style={{ width: "7rem", margin: "10px", marginBottom: "12px" }}
        >
          Add Expense
        </button>
      </form>
      {modalShow && (
        <ModalComp
          modalShow={() => setModalShow(!modalShow)}
          open={modalShow}
          content={{ title: "Reminder" }}
        />
      )}
    </>
  );
};
