import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";

const categoryColors = {
  Food: "#4caf50",       
  Travel: "#ff9800",     
  Shopping: "#9c27b0",  
  Bills: "#2196f3",     
  Other: "#f44336",     
};


ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const handleMonthChange = (month) => {
    setFilterMonth(month);
  };

  const handleCategoryChange = (cat) => {
    setFilterCategory(cat);
  };

  const filteredExpenses = expenses.filter((exp) => {
    const matchesMonth =
      filterMonth === "All"
        ? true
        : new Date(exp.date).getMonth() === Number(filterMonth);

    const matchesCategory =
      filterCategory === "All" ? true : exp.category === filterCategory;

    return matchesMonth && matchesCategory;
  });

  const total = filteredExpenses.reduce(
    (acc, cur) => acc + Number(cur.amount),
    0
  );

  const categoryTotals = filteredExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
    return acc;
  }, {});

  const chartData = {
  labels: Object.keys(categoryTotals),
  datasets: [
    {
      data: Object.values(categoryTotals),
      backgroundColor: Object.keys(categoryTotals).map(
        (cat) => categoryColors[cat] || "#607d8b"
      ),
    },
  ],
};


  return (
    <div className="app">
      <h1>Expense Info</h1>

      <ExpenseForm addExpense={addExpense} />

      <div className="filter-container">
        <ExpenseFilter
          type="month"
          selected={filterMonth}
          onFilterChange={handleMonthChange}
        />
        <ExpenseFilter
          type="category"
          selected={filterCategory}
          onFilterChange={handleCategoryChange}
        />
      </div>

      <ExpenseList
  expenses={filteredExpenses}
  deleteExpense={deleteExpense}
  categoryColors={categoryColors} 
/>

      <h3>Total: ₹{total}</h3>

      {filteredExpenses.length > 0 && (
        <div className="chart">
          <h4>Expense Breakdown</h4>
          <Pie data={chartData} />
        </div>
      )}

      <button
        onClick={() => {
          localStorage.removeItem("expenses");
          setExpenses([]);
        }}
        className="clear-btn"
      >
        Clear All Expenses
      </button>
    </div>
  );
}

export default App;
