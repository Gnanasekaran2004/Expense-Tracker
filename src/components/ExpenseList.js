import React from "react";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, deleteExpense, categoryColors }) {
  return (
    <div className="expense-list">
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            deleteExpense={deleteExpense}
            categoryColors={categoryColors} 
          />
        ))
      )}
    </div>
  );
}

export default ExpenseList;
