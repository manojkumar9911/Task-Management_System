// console.log("Checking models directory...");
// const path = require("path");
// console.log("Current directory:", __dirname);
// console.log("Looking for:", path.join(__dirname, "models"));
// const db = require("./models"); // Automatically loads index.js
// console.log("Models loaded successfully!");


const express = require("express");
const path = require("path");
const db = require(path.join(__dirname, "models")); // Ensure it imports index.js correctly
const Task = db.Task; // Explicitly get Task model

const router = express.Router();

// ✅ Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const newTask = await Task.create({ title, description, dueDate, priority, status: "Pending" });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});

// ✅ Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// ✅ Update task status (Pending → In Progress → Completed)
router.put("/tasks/:id/status", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    const statusFlow = ["Pending", "In Progress", "Completed"];
    const currentIndex = statusFlow.indexOf(task.status);
    if (currentIndex < statusFlow.length - 1) {
      task.status = statusFlow[currentIndex + 1];
      await task.save();
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error updating task status" });
  }
});

module.exports = router;
