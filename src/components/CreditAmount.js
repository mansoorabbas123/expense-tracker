import React, { useState, useContext } from "react";
import { CloseButton } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";

export const CreditAmount = ({ setActiveForm }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };

    console.log("transaction::", newTransaction);

    addTransaction(newTransaction);
    setActiveForm(null);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="px-3 pb-4"
        style={{ backgroundColor: "#fff" }}
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
            (negative - expense, positive - income)
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
          Add Credit
        </button>
      </form>
    </>
  );
};
