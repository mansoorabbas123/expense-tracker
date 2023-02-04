import React from "react";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/TransactionList";
import { GlobalProvider } from "./context/GlobalState";
import AddNewTransaction from "./components/AddNewTransaction";
import Search from './components/Search';

import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <div className="container">
        <Header />
        <AddNewTransaction />
        <Search />
        <TransactionList />
      </div>
    </GlobalProvider>
  );
}

export default App;
