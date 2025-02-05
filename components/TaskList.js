import React, { Component } from 'react';
import TaskItem from './TaskItem'; // Assuming you have TaskItem component
import '../styles/TaskList.css';

class TaskList extends Component {
  state = {
    tasks: [], // Array to hold fetched tasks from the database
  };

  componentDidMount() {
    this.fetchTasks();
  }

  // Fetch tasks from the database
  fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    this.setState({ tasks });
  };

  // Update task status (completed or not) in the database
  updateTaskStatus = async (taskId, completed) => {
    const response = await fetch('/api/tasks', {
      method: 'PUT',
      body: JSON.stringify({ id: taskId, completed }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      this.fetchTasks(); // Refetch tasks after updating
    }
  };

  // Delete task from the database
  deleteTask = async (taskId) => {
    const response = await fetch('/api/tasks', {
      method: 'DELETE',
      body: JSON.stringify({ taskId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      this.fetchTasks(); // Refetch tasks after deleting
    }
  };

  // Edit task details in the database
  saveEdit = async (taskId, updatedTaskData) => {
    const response = await fetch('/api/tasks', {
      method: 'PUT',
      body: JSON.stringify({ id: taskId, ...updatedTaskData }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      this.fetchTasks(); // Refetch tasks after editing
    }
  };

  render() {
    const { tasks } = this.state;

    return (
      <div className="task-list">
        <h2>Task List</h2>
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Task</th>
              <th>Task Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id} className={task.completed ? 'completed' : ''}>
                <td>{index + 1}</td> {/* Serial Number */}
                <td>{task.title}</td> {/* Task Title */}
                <td>{task.description}</td> {/* Task Description */}
                <td>{task.dueDate}</td> {/* Date */}
                <td>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => this.updateTaskStatus(task._id, !task.completed)}
                    />
                    {task.completed ? 'Completed' : 'Complete'}
                  </label>
                </td> {/* Status */}
                <td>
                  <button onClick={() => this.saveEdit(task._id, { isEditing: true })}>Edit</button>
                  <button onClick={() => this.deleteTask(task._id)}>Delete</button>
                </td> {/* Actions */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TaskList;
