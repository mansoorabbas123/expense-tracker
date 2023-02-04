import React, { useContext } from "react";
import { Transaction } from "./Transaction";

import { GlobalContext } from "../context/GlobalState";
import { Col, Row } from "react-bootstrap";

export const TransactionList = () => {
  const { transactions, expenses, search } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <Row>
        <Col>
          <ul className="list">
            <h5>Credits</h5>
            {transactions
              .filter((transaction) => {
                if (search.value == "" || search.type === "expense") {
                  return transaction;
                } else if (
                  transaction.text.toLowerCase().includes(search.value.toLowerCase())
                ) {
                  return transaction;
                }
              })
              .map((transaction) => (
                <Transaction
                  key={transaction.id}
                  transaction={transaction}
                  variant="transaction"
                />))}
          </ul>
        </Col>
        <Col>
          <ul className="list">
            <h5>Expenses</h5>
            {expenses
              .filter((expense) => {
                if (search.value == "" || search.type === "credit") {
                  return expense;
                } else if (
                  expense.text.toLowerCase().includes(search.value.toLowerCase())
                ) {
                  return expense;
                }
              })
              .map((expense) => (
                <Transaction
                  key={expense.id}
                  transaction={expense}
                  variant="expense"
                />))}
          </ul>
        </Col>
      </Row>
    </>
  );
};
