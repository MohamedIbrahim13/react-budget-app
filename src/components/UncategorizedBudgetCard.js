import BudgetCard from "./BudgetCard";
import { useContext } from "react";
import {
  BudgetContext,
  UNCATEGORIZED_BUDGET_ID,
} from "../context/BudgetContext";

export default function UncategorizedBudgetCard(props) {
  const { getBudgetById } = useContext(BudgetContext);
  const amount = getBudgetById(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  if (amount === 0) return null;
  return <BudgetCard amount={amount} name="Uncategorized" gray {...props} />;
}
