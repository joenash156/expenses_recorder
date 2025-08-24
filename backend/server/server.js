const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const expensesRoutes = require("../routes/expenses-routes.js");

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expensesRoutes);

app.listen(PORT, () => {
  console.log(`The sever is running on http://localhost:${PORT}`);
});
