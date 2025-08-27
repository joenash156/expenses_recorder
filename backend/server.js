const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const expensesRoutes = require("./routes/expenses-routes.js");

app.use(cors());
app.use(express.json());

const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://localhost:5000",
  "http://localhost:3000",
  "https://expenses-recorder.netlify.app/",
  "https://expenses-recorder-ebon.vercel.app/",
  "https://expense-recorder.onrender.com/"
];

// Setup CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/expenses", expensesRoutes);

app.listen(PORT, () => {
  console.log(`The sever is running on http://localhost:${PORT}`);
});
