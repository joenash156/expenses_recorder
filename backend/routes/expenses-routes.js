const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expenses-controllers.js");

// get route
router.get("/", expensesController.getExpenses);

// get with id route
router.get("/:id", expensesController.getExpenseById);

// post route
router.post("/", expensesController.insertExpenses);

// update route
router.put("/:id", expensesController.updateExpenses);

// delete route
router.delete("/:id", expensesController.deleteExpenses);

module.exports = router;
