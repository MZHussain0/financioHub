const Expense = require("../models/expenseModel");
const asyncHandler = require("express-async-handler");

// @desc Create new expense
const createNewExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  // Confirm data
  if (!title || !amount || !category || !description || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (amount <= 0 || !amount === "number") {
    return res
      .status(400)
      .json({ message: "Amount must be a positive number" });
  }

  const expenseObject = {
    title,
    amount,
    category,
    description,
    date,
  };

  const expense = await Expense.create(expenseObject);

  if (expense) {
    res.status(201).json({ message: "New expense is added" });
  } else {
    res.status(400).json({ message: "Invalid expense data recieved" });
  }
});

// @desc Get all expenses
const getAllExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find().lean().sort({ createdAt: -1 });

  if (!expenses?.length) {
    return res.status(400).json({ message: "No expenses found" });
  }

  res.json(expenses);
});

// @desc Delete a expense
const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "expense ID required" });
  }

  // Confirm expense exists to delete
  const expense = await Expense.findById(id).exec();

  if (!expense) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await expense.deleteOne();

  const reply = `expense '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  createNewExpense,
  getAllExpenses,
  deleteExpense,
};
