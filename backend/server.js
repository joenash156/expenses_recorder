const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const expensesRoutes = require("./routes/expenses-routes.js");

app.use(cors());
app.use(express.json());

const allowedOrigins = [
  "http://127.0.0.1:5500", // when testing with Live Server
  "http://localhost:5500", // some setups use localhost instead of 127.0.0.1
  "http://localhost:3000", // if you use React locally
  "https://your-frontend.netlify.app" // 🔴 replace with your Netlify domain
];

// ✅ Setup CORS
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
    credentials: true
  })
);

app.use("/api/expenses", expensesRoutes);

app.listen(PORT, () => {
  console.log(`The sever is running on http://localhost:${PORT}`);
});
