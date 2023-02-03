import React, { useContext } from "react";
import { Transaction } from "./Transaction";

import { GlobalContext } from "../context/GlobalState";
import { Col, Row } from "react-bootstrap";

export const TransactionList = () => {
  const { transactions, expenses } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <Row>
        <Col>
          <ul className="list">
            <h5>Credits</h5>
            {transactions.map((transaction) => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))}
          </ul>
        </Col>
        <Col>
          <ul className="list">
            <h5>Expenses</h5>
            {expenses.map((transaction) => (
              <Transaction
                key={transaction.id}
                transaction={transaction}
                variant="expense"
              />
            ))}
          </ul>
        </Col>
      </Row>
    </>
  );
};
