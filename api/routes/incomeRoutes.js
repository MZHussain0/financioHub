const express = require("express");
const incomeController = require("../controllers/incomeController");
const router = express.Router();

router
  .post("/add-income", incomeController.createNewIncome)
  .get("/get-incomes", incomeController.getAllIncomes)
  .delete("/delete-income/:id", incomeController.deleteIncome);

module.exports = router;
