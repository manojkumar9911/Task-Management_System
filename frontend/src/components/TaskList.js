import React from "react";

function TaskList({ tasks, updateStatus }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Priority: <span className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</span></p>
          <p>Status: <strong>{task.status}</strong></p>
          <button onClick={() => updateStatus(task.id)}>Next Status</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
