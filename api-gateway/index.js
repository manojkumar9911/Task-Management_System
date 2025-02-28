console.log("API Gateway started!");

require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5000;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

// Middleware for logging requests

app.use(morgan("combined"));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to reject requests where title contains "test"
app.use((req, res, next) => {
  if (req.body && req.body.title && req.body.title.toLowerCase().includes("test")) {
    return res.status(400).json({ error: "Task title cannot contain 'test'" });
  }
  next();
});

// API Gateway: Forward all "/tasks" requests to the backend
app.use(
  "/tasks",
  createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
  })
);

// Start API Gateway
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
  console.log(`🔀 Forwarding /tasks requests to ${BACKEND_URL}`);
});
