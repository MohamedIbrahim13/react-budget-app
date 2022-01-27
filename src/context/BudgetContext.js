import { createContext } from "react";
import { v4 as uuidV4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";
export const BudgetContext = createContext();

// budget {
//   id,
//   name,
//   max,
// }
// expneses {
//   budgetId,id
//   description,amount

// }

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const BudgetProvider = ({ children }) => {
  const [budgets, setBugets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  function addBudget({ name, max }) {
    setBugets(prev => {
      if (prev.find(prevBudget => prevBudget.name === name)) {
        return prev;
      }
      return [...prev, { id: uuidV4(), name, max }];
    });
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses(prev => {
      return [...prev, { id: uuidV4(), description, amount, budgetId }];
    });
  }

  function deleteBudget({ budgetId }) {
    setExpenses(prev => {
      return prev.map(expense => {
        if (expense.budgetId !== budgetId) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBugets(prev => {
      return prev.filter(budget => budget.id === budgetId);
    });
  }

  function deleteExpense({ expenseId }) {
    setExpenses(prev => {
      return prev.filter(expense => expense.id === expenseId);
    });
  }

  function getBudgetById(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId);
  }
  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
        getBudgetById,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
