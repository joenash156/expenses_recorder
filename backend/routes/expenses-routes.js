const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expenses-controllers.js");

// get controller
router.get("/", expensesController.getExpenses);

module.exports = router;
