
// import React, { useState } from "react";
// import TaskForm from "./components/TaskForm";
// import TaskList from "./components/TaskList";
// import "./App.css";

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]); // Stores task list
  const [taskInput, setTaskInput] = useState(""); // Stores new task input
  const [statusFilter, setStatusFilter] = useState("All"); // Status filter

  // ✅ Fetch tasks from API when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tasks");
        if (!response.ok) throw new Error("Failed to fetch tasks");

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // ✅ Add a new task (Fixes circular reference issue)
  const addTask = async () => {
    if (!taskInput.trim()) {
      alert("Task description cannot be empty!");
      return;
    }

    const newTaskData = {
      title: taskInput,
      description: taskInput,
      status: "Pending",
      priority: "Medium",
      dueDate: new Date().toISOString(),
    };

    console.log("📡 Sending Task Data:", newTaskData);

    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskData),
      });

      console.log("🖥️ Response Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error from server:", errorText);
        alert(`Error: ${errorText}`);
        return;
      }

      const newTask = await response.json();
      console.log("✅ Task Added Successfully:", newTask);

      setTasks([...tasks, newTask]);
      setTaskInput("");
    } catch (error) {
      console.error("⚠️ Network error:", error);
      alert("Network error. Check if backend is running.");
    }
  };

  // ✅ Update task status
  const updateStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        console.error("Error updating task:", await response.text());
        return;
      }

      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // ✅ Delete a task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Error deleting task:", await response.text());
        return;
      }

      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // ✅ Filter tasks based on status
  const filteredTasks =
    statusFilter === "All" ? tasks : tasks.filter((task) => task.status === statusFilter);

  return (
    <div className="app-container">
      <h1 className="title">Task Management System</h1>

      {/* Task Input */}
      <div className="task-input-container">
        <input
          type="text"
          className="task-input"
          placeholder="Enter task title..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask} className="add-task-btn">
          Add Task
        </button>
      </div>

      {/* Status Filter */}
      <div className="filters">
        <select className="filter-dropdown" onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-actions">
              <button className="edit-btn" onClick={() => updateStatus(task.id, "In Progress")}>
                In Progress
              </button>
              <button className="complete-btn" onClick={() => updateStatus(task.id, "Completed")}>
                Completed
              </button>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
            <span className={`status-label ${task.status.toLowerCase().replace(" ", "-")}`}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
