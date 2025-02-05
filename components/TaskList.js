// /components/TaskList.js
import React, { Component } from 'react';
import TaskItem from './TaskItem';


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

  render() {
    const { tasks, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    );
  }
}

export default TaskList;
