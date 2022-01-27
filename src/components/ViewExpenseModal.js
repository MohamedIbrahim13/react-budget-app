import { Modal, Button, Stack } from "react-bootstrap";
import { useContext } from "react";
import {
  BudgetContext,
  UNCATEGORIZED_BUDGET_ID,
} from "../context/BudgetContext";
import { currencyFormatter } from "../utils";

export default function ViewExpenseModal({ budgetId, handleClose }) {
  const { getBudgetById, budgets, deleteBudget, deleteExpense } =
    useContext(BudgetContext);
  const expenses = getBudgetById(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Unctegorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find(b => b.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
