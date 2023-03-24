const express = require("express");
const expenseController = require("../controllers/expenseController");
const router = express.Router();

router
  .post("/add-expense", expenseController.createNewExpense)
  .get("/get-expenses", expenseController.getAllExpenses)
  .delete("/delete-expense/:id", expenseController.deleteExpense);

module.exports = router;
