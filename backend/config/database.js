const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "expensesdb",
  port: process.env.DB_PORT || 3306,
  ssl: { rejectUnauthorized: false },
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
