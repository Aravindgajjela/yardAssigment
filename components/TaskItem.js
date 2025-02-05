import React, { Component } from 'react';
import '../styles/TaskItem.css';

class TaskItem extends Component {
  state = {
    completed: this.props.task.completed,
    isEditing: false,
    title: this.props.task.title,
    description: this.props.task.description,
    dueDate: this.props.task.dueDate,
  };

  componentDidMount() {
    this.setState({ completed: this.props.task.completed });
  }

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
      this.props.onUpdate(_id, { completed: newStatus });
    }
  };

  deleteTask = async () => {
    const { _id } = this.props.task;
    const response = await fetch('/api/tasks', {
      method: 'DELETE',
      body: JSON.stringify({ taskId: _id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      this.props.onDelete(_id);
    }
  };

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  handleEditChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveEdit = async () => {
    const { _id } = this.props.task;
    const { title, description, dueDate } = this.state;

    const response = await fetch('/api/tasks', {
      method: 'PUT',
      body: JSON.stringify({ id: _id, title, description, dueDate }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      this.setState({ isEditing: false });
      this.props.onUpdate(_id, { title, description, dueDate });
    }
  };

  render() {
    const { title, description, dueDate, completed, isEditing } = this.state;

    return (
      <tr className={`task-item ${completed ? 'completed' : ''}`}>
        <td>{this.props.index + 1}</td> {/* Serial Number */}
        <td>{isEditing ? <input type="text" name="title" value={title} onChange={this.handleEditChange} /> : title}</td>
        <td>{isEditing ? <textarea name="description" value={description} onChange={this.handleEditChange} /> : description}</td>
        <td>{isEditing ? <input type="date" name="dueDate" value={dueDate} onChange={this.handleEditChange} /> : dueDate}</td>
        <td>
          <label>
            <input type="checkbox" checked={completed} onChange={this.toggleCompletion} />
            {completed ? 'Completed' : 'Complete'}
          </label>
        </td>
        <td>
          {isEditing ? <button onClick={this.saveEdit}>Save</button> : <button onClick={this.toggleEdit}>Edit</button>}
          <button onClick={this.deleteTask}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
