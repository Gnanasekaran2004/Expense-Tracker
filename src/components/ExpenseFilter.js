import React from "react";

function ExpenseFilter({ type, selected, onFilterChange }) {
  return (
    <div className="expense-filter">
      <label>
        {type === "month" ? "Filter by Month:" : "Filter by Category:"}
      </label>
      <select value={selected} onChange={(e) => onFilterChange(e.target.value)}>
        {type === "month" ? (
          <>
            <option value="All">All</option>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </>
        ) : (
          <>
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </>
        )}
      </select>
    </div>
  );
}

export default ExpenseFilter;
