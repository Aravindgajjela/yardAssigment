import React, { Component } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

class Home extends Component {
  state = {
    tasks: [], 
  };

  componentDidMount() {
    this.fetchTasks(); 
  }

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

  handleTaskAdded = (newTask) => {
    this.setState({ tasks: [...this.state.tasks, newTask] });
  };

  handleTaskUpdated = (taskId, updatedData) => {
    this.setState({
      tasks: this.state.tasks.map((task) =>
        task._id === taskId ? { ...task, ...updatedData } : task
      ),
    });
  };

  handleTaskDeleted = (taskId) => {
    this.setState({
      tasks: this.state.tasks.filter((task) => task._id !== taskId),
    });
  };

  render() {
    return (
      <div>
        <h1>Task Management</h1>
        <TaskForm onTaskAdded={this.handleTaskAdded} />
        <TaskList
          tasks={this.state.tasks}
          onUpdate={this.handleTaskUpdated}
          onDelete={this.handleTaskDeleted}
        />
      </div>
    );
  }
}

export default Home;
