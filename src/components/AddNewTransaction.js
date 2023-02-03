import React, { useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AddExpenses } from "./AddExpenses";
import { CreditAmount } from "./CreditAmount";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { GlobalContext } from "../context/GlobalState";
import ModalComp from "./ModalComp";

const AddNewTransaction = () => {
  const { transactions, expenses } = useContext(GlobalContext);
  const [modalShow, setModalShow] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  const total_amounts = transactions.map((transaction) => transaction.amount);
  const total_expenses = expenses.map((expense) => expense.amount);
  const remaining = total_amounts.reduce((acc, item) => (acc += item), 0);
  const expense =
    total_expenses
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1;
  console.log("expense", expense);
  const total_remaining = remaining - expense;

  return (
    <div>
      <h3>Add new transaction</h3>
      {!activeForm && (
        <Row>
          <Col>
            <Button
              onClick={() => setActiveForm("addCredit")}
              className="d-flex justify-content-center align-items-center"
              variant="success"
            >
              <AiOutlinePlusSquare size={20} className="d-block" />{" "}
              <span className="d-block mx-1">Add Credit</span>
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                if (total_remaining < 1) {
                  setModalShow(true);
                } else {
                  setActiveForm("addExpense");
                }
              }}
              className="d-flex justify-content-center align-items-center"
              variant="danger"
            >
              <AiOutlineMinusSquare size={20} className="d-block" />{" "}
              <span className="d-block mx-1">Add Expense</span>
            </Button>
          </Col>
        </Row>
      )}
      {activeForm === "addCredit" ? (
        <CreditAmount setActiveForm={setActiveForm} />
      ) : total_remaining > 0 && activeForm === "addExpense" ? (
        <AddExpenses setActiveForm={setActiveForm} />
      ) : null}

      {modalShow && (
        <ModalComp
          modalShow={() => setModalShow(!modalShow)}
          open={modalShow}
          content={{ title: "Reminder" }}
        />
      )}
    </div>
  );
};

export default AddNewTransaction;
