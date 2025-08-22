const db = require("../config/database.js");

// select or get expenses from database
exports.getExpenses = (req, res) => {
  const selectQuery = "SELECT * FROM expenses";

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Error fetching expenses:", err);
      return res.status(500).json({
        error: "Database error",
      });
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  });
};

// get expenses with id

exports.getExpenseById = (req, res) => {
  const id = req.params.id;
  const selectQuery = "SELECT * FROM expenses WHERE id = ?";

  db.query(selectQuery, [id], (err, results) => {
    if (err) {
      console.error("Error fetching expense:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      data: results[0], // only one row expected
    });
  });
};

// insert expense into database
exports.insertExpenses = (req, res) => {
  // get data from request body
  const { type, title, description, amount } = req.body;

  // validate data to see if they were all provided
  if (!type || !title || !description || !amount) {
    return res.status(400).json({
      error: "All data are required",
    });
  }

  const insertQuery =
    "INSERT INTO expenses (type, title, description, amount) VALUES (?, ?, ?, ?)";
  const data = [type, title, description, amount];

  db.query(insertQuery, data, (err, results) => {
    if (err) {
      console.error("Error inserting expense:", err);
      return res.status(500).json({
        error: "Database error!",
      });
    } else {
      res.status(201).json({
        message: "Expense inserted successfully",
        expense: {
          id: results.insertId,
          type,
          title,
          description,
          amount,
        },
      });
    }
  });
};

// update expenses
exports.updateExpenses = (req, res) => {
  const id = req.params.id;

  // Get data from request body
  const { type, title, description, amount } = req.body;

  if (!type || !title || !description || !amount) {
    return res.status(400).json({
      error: "All fields (type, title, description, amount) are required",
    });
  }

  const updateQuery =
    "UPDATE expenses SET type = ?, title = ?, description = ?, amount = ? WHERE id = ?";
  const data = [type, title, description, amount, id];

  db.query(updateQuery, data, (err, results) => {
    if (err) {
      console.error("Failed updating expense:", err);
      return res.status(500).json({ error: "Database error!" });
    }

    if (results.affectedRows === 0) {
      console.log("No match of the data in database!");
      return res.status(404).json({
        unexpected: "No expense found with the given ID!",
      });
    }

    res.status(200).json({
      message: "Expense updated successfully!",
      result: { id, type, title, description, amount },
    });
  });
};

exports.deleteExpenses = (req, res) => {
  
  const id = req.params.id;

  const deleteQuery = "DELETE FROM expenses WHERE id = ?";
  const data = [id];

  db.query(deleteQuery, data, (err, results) => {
    if (err) {
      console.error("Failed deleting expense:", err);
      return res.status(500).json({
        error: "Database error!",
      });
    } else if (results.affectedRows === 0) {
      console.log("Your data does not match any expense!");
      return res.status(404).json({
        error: "Check your data well!",
      });
    } else {
      res.status(201).json({
        message: "Expense deleted successfully!",
      });
    }
  });
};
