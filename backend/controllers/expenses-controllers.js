const db = require("../config/database.js")

exports.getExpenses = (req, res) => {
  const selectQuery = "SELECT * FROM expenses";

  db.query(selectQuery, (err, result) => {
    if(err) {
      console.error("Error fetching expenses:", err);
      return res.status(500).json(
        {
          error: "Database error"
        }
      )
    }
    res.status(201).json(result)

  })
}