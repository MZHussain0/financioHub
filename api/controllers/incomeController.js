const Income = require("../models/incomeModel");
const asyncHandler = require("express-async-handler");

// @desc Create new note
const createNewIncome = asyncHandler(async (req, res) => {
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

  const incomeObject = {
    title,
    amount,
    category,
    description,
    date,
  };

  const income = await Income.create(incomeObject);

  if (income) {
    res.status(201).json({ message: "New income is added" });
  } else {
    res.status(400).json({ message: "Invalid income data recieved" });
  }
});

// @desc Get all incomes
const getAllIncomes = asyncHandler(async (req, res) => {
  const incomes = await Income.find().lean().sort({ createdAt: -1 });

  if (!incomes?.length) {
    return res.status(400).json({ message: "No incomes found" });
  }

  res.json(incomes);
});

// @desc Delete a income
const deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "income ID required" });
  }

  // Confirm income exists to delete
  const income = await Income.findById(id).exec();

  if (!income) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await income.deleteOne();

  const reply = `income '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = { createNewIncome, getAllIncomes, deleteIncome };
