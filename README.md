# Task-Management_System
It is a task management system, in which you can keep track of your track of ypur daily track.

Tech Stack
Backend (Node.js + Express.js)
REST API to manage tasks
Sequelize ORM with PostgreSQL
Custom validation for tasks
Error handling with meaningful messages
API Gateway for request logging & validation

Frontend (React.js)
Task Management UI:
📌 List tasks with filters:
Show high-priority tasks only (toggle switch).
Show tasks due in the next 3 days.
📝 Create tasks with validation.
🔄 Update task status (Pending → In Progress → Completed).
✅ Custom Hooks: useTasks.js for state management.
📱 Responsive UI for a seamless experience.


Features
Backend (Node.js + Express.js)
✔️ Create a Task (title, description, due date, status, priority)
✔️ Update Task Status (Pending → In Progress → Completed)
✔️ Fetch All Tasks (with filters):

Show high-priority tasks
Show tasks due in the next 3 days
Fetch a task by ID
✔️ Custom Validation:
✅ Title must be unique
⏳ Due date cannot be in the past
✔️ API Gateway Middleware:
Logs all requests (method, endpoint, timestamp)
Rejects requests if the title contains "test"
✔️ Error Handling: Meaningful error messages
Frontend (React.js)
✔️ Task List UI (filtering & sorting)
✔️ Form validation for task creation
✔️ Status update with a dropdown
✔️ Local State Management (without Redux)
✔️ Custom Hooks (useTasks.js) for API requests & state


Project Setup
1️⃣ Clone the Repository
git clone https://github.com/manojkumar9911/Task-Management_System.git
cd Task-Management_System

2️⃣ Backend Setup (Node.js + Express.js)
cd backend
npm install
run node.js  #start the server

3️⃣ Database Setup (PostgreSQL)
Ensure PostgreSQL is running
Create a new database and apply migrations:
npx sequelize-cli db:migrate

4️⃣ Frontend Setup (React.js)
cd frontend
npm install
npm start   #Starts the React app
