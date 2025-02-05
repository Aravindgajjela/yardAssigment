// /components/TaskItem.js
import React, { Component } from 'react';


class TaskItem extends Component {
  state = {
    completed: this.props.task.completed,
  };

  toggleCompletion = async () => {
    const { _id } = this.props.task;
    const newStatus = !this.state.completed;

    const response = await fetch('/api/tasks', {
      method: 'PUT',
      body: JSON.stringify({ id: _id, completed: newStatus }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      this.setState({ completed: newStatus });
    }
  };

  deleteTask = async () => {
    const { _id } = this.props.task;
    await fetch('/api/tasks', {
      method: 'DELETE',
      body: JSON.stringify({ taskId: _id }),
      headers: { 'Content-Type': 'application/json' },
    });
    this.props.onDelete(_id); // Parent component will handle task removal from state
  };

  render() {
    const { title, description, dueDate } = this.props.task;
    return (
      <div className="task-item">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{dueDate}</p>
        <input
          type="checkbox"
          checked={this.state.completed}
          onChange={this.toggleCompletion}
        />
        <button onClick={this.deleteTask}>Delete</button>
      </div>
    );
  }
}

export default TaskItem;
