import BudgetCard from "./BudgetCard";
import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useContext(BudgetContext);
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  if (max === 0) return null;
  return <BudgetCard name="Total" gray amount={amount} max={max} hideButtons />;
}
