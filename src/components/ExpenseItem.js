import React from "react";

function ExpenseItem({ expense, deleteExpense, categoryColors }) {
  const formattedDate = new Date(expense.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="expense-item"
      style={{
        borderLeft: `6px solid ${categoryColors[expense.category] || "#607d8b"}`,
      }}
    >
      <div>
        <strong>{expense.title}</strong> <br />
        <small>{expense.category}</small> <br />
        <small>{formattedDate}</small>
      </div>
      <span>₹{expense.amount}</span>
      <button onClick={() => deleteExpense(expense.id)}>X</button>
    </div>
  );
}

export default ExpenseItem;
