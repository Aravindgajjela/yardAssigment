// /components/TaskList.js
import React, { Component } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

class TaskList extends Component {
  state = {
    tasks: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchTasks();
  }

  async fetchTasks() {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      this.setState({ tasks: data, loading: false });
    } catch (error) {
      this.setState({ error: 'Failed to load tasks', loading: false });
    }
  }

  handleDelete = (id) => {
    this.setState({ tasks: this.state.tasks.filter((task) => task._id !== id) });
  };

  handleUpdate = (id, updatedTask) => {
    this.setState({
      tasks: this.state.tasks.map((task) => (task._id === id ? { ...task, ...updatedTask } : task)),
    });
  };

  render() {
    const { tasks, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} onDelete={this.handleDelete} onUpdate={this.handleUpdate} />
        ))}
      </div>
    );
  }
}

export default TaskList;

