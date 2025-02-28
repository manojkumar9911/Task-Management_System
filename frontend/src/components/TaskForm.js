import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [taskDescription, setTaskDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Prevent page refresh
    if (!taskDescription.trim()) {
      alert("Task description cannot be empty!");
      return;
    }
    addTask({ description: taskDescription, status: "Not Started", priority: "Medium" });
    setTaskDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Enter task description..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
