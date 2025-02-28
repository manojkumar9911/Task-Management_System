-- PostgreSQL Schema Setup for Task Management System

-- Create the tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    due_date TIMESTAMP CHECK (due_date > NOW()),
    status VARCHAR(50) CHECK (status IN ('Pending', 'In Progress', 'Completed')) DEFAULT 'Pending',
    priority VARCHAR(20) CHECK (priority IN ('Low', 'Medium', 'High')) DEFAULT 'Medium'
);

-- Create an index on the due_date column to improve query performance
CREATE INDEX idx_due_date ON tasks(due_date);

-- Create a trigger to automatically mark tasks as "Overdue" if the due date has passed
CREATE OR REPLACE FUNCTION mark_overdue_tasks()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.due_date < NOW() THEN
        NEW.status := 'Overdue';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger before any update on tasks
CREATE TRIGGER trigger_mark_overdue
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION mark_overdue_tasks();

-- Insert sample tasks (optional)
INSERT INTO tasks (title, description, due_date, status, priority) VALUES
('Project Proposal', 'Write and submit the project proposal', '2025-03-10 10:00:00', 'Pending', 'High'),
('Code Review', 'Review the code and give feedback', '2025-03-12 15:00:00', 'In Progress', 'Medium'),
('Deploy Application', 'Deploy the latest version to production', '2025-03-15 09:00:00', 'Pending', 'High');
