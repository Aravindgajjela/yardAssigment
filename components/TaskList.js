import React, { Component } from "react";
import TaskItem from "./TaskItem"; // Assuming you have TaskItem component


class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // Array to hold fetched tasks from the database
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  // Fetch tasks from the database
  fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const tasks = await response.json();
      this.setState({ tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Update task status without refetching
  updateTaskStatus = async (taskId, completed) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        body: JSON.stringify({ id: taskId, completed }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        this.setState((prevState) => ({
          tasks: prevState.tasks.map((task) =>
            task._id === taskId ? { ...task, completed } : task
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task without refetching
  deleteTask = async (taskId) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "DELETE",
        body: JSON.stringify({ taskId }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        this.setState((prevState) => ({
          tasks: prevState.tasks.filter((task) => task._id !== taskId),
        }));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit task details without refetching
  saveEdit = async (taskId, updatedTaskData) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        body: JSON.stringify({ id: taskId, ...updatedTaskData }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        this.setState((prevState) => ({
          tasks: prevState.tasks.map((task) =>
            task._id === taskId ? { ...task, ...updatedTaskData } : task
          ),
        }));
      }
    } catch (error) {
      console.error("Error editing task:", error);
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
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <TaskItem
                key={task._id}
                index={index}
                task={task}
                onUpdate={this.saveEdit}
                onDelete={this.deleteTask}
                onStatusChange={this.updateTaskStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TaskList;
