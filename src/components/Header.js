import React, { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
import ModalComp from "./ModalComp";

function remainingMoneyFormatter(num) {
  let p = num.toFixed(2).split(".");
  return (
    "$ " +
    (p[0].split("")[0] === "-" ? "-" : "") +
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

function incomeAndExpenseMoneyFormatter(num) {
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

export const Header = () => {
  const { transactions, budget, updateBudgetHanler, expenses } =
    useContext(GlobalContext);

  const [modalShow, setModalShow] = React.useState(false);

  const total_amounts = transactions.map((transaction) => transaction.amount);
  const total_expenses = expenses.map((expense) => expense.amount);
  const remaining = total_amounts.reduce((acc, item) => (acc += item), 0);
  const expense =
    total_expenses
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1;
  console.log("expense", expense);
  const total_remaining = remaining - expense;
  // <h4>Your Balance</h4>
  // <h1>{remainingMoneyFormatter(totalRemaining)}</h1>

  return (
    <div className="mb-5">
      <h2>Expense Tracker</h2>
      <Row>
        <Col>
          <div
            class="border d-flex justify-content-between align-items-center px-4 text-light border-2"
            style={{ backgroundColor: "#df7820" }}
          >
            <p className="mt-2">
              Budget: <span>{incomeAndExpenseMoneyFormatter(budget)}</span>
            </p>
            <Button
              variant="primary"
              size="md"
              className="mt-4"
              style={{ width: "4rem", padding: "1px" }}
              onClick={() => setModalShow(true)}
            >
              Edit
            </Button>
          </div>
        </Col>
        <Col>
          <div
            class="border d-flex justify-content-between align-items-center p-3 px-4 border-2 text-light"
            style={{ backgroundColor: "#2ecc71" }}
          >
            <p className="mt-2">
              Remaining: <span>{remainingMoneyFormatter(total_remaining)}</span>
            </p>
          </div>
        </Col>
        <Col>
          <div
            class="border d-flex justify-content-between align-items-center p-3  px-4 text-light border-"
            style={{ backgroundColor: "#c0392b" }}
          >
            <p className="mt-2">
              Spent so far:{" "}
              <span>{incomeAndExpenseMoneyFormatter(expense)}</span>
            </p>
          </div>
        </Col>
      </Row>
      {modalShow && (
        <ModalComp
          modalShow={() => setModalShow(!modalShow)}
          open={modalShow}
          content={{ title: "Update your budget", updateBudgetHanler }}
        />
      )}
    </div>
  );
};
