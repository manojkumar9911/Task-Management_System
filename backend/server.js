require("dotenv").config(); // Load .env variables
const express = require("express");
const { sequelize } = require("./models"); // Import sequelize from models
const taskRoutes = require("./taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", taskRoutes);

sequelize.sync()
  .then(() => console.log("✅ PostgreSQL Connected!"))
  .catch((err) => console.error("❌ Connection Error:", err));

app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
