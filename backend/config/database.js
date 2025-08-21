const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "expensesdb",
});

// connect to mysql database
db.connect((err) => {
  if (err) {
    console.error("Database error:", err.stack);
    return;
  }
  console.log("Database connected successfully!");
});

module.exports = db;
