// /components/TaskForm.js
import React, { Component } from 'react';

class TaskForm extends Component {
  state = {
    title: '',
    description: '',
    dueDate: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, dueDate } = this.state;

    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description, dueDate }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const newTask = await response.json();
      this.props.onTaskAdded(newTask);
      this.setState({ title: '', description: '', dueDate: '' });
    }
  };

  render() {
    const { title, description, dueDate } = this.state;
    return (
      <form className="task-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Task Title"
          required
        />
        <textarea
          name="description"
          value={description}
          onChange={this.handleChange}
          placeholder="Task Description"
          required
        />
        <input
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={this.handleChange}
          required
        />
        <button type="submit">Add Task</button>
      </form>
    );
  }
}

export default TaskForm;
