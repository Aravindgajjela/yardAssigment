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
    // Ensure checkbox status is updated on page load
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
      this.props.onUpdate(_id, { completed: newStatus }); // ✅ Update Parent
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
      this.props.onDelete(_id); // ✅ Remove task from UI
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
      this.props.onUpdate(_id, { title, description, dueDate }); // ✅ Update Parent
    }
  };

  render() {
    const { title, description, dueDate, completed, isEditing } = this.state;

    return (
      <div className={`task-item ${completed ? 'completed' : ''}`}>
        {isEditing ? (
          <>
            <input type="text" name="title" value={title} onChange={this.handleEditChange} />
            <textarea name="description" value={description} onChange={this.handleEditChange} />
            <input type="date" name="dueDate" value={dueDate} onChange={this.handleEditChange} />
            <button onClick={this.saveEdit}>Save</button>
          </>
        ) : (
          <>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{dueDate}</p>

            {/* ✅ Checkbox is now fully functional */}
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={this.toggleCompletion}
              />
              {completed ? 'Completed' : 'Complete'} {/* Toggle between Complete and Completed */}
            </label>

            <button onClick={this.toggleEdit}>Edit</button>
            <button onClick={this.deleteTask}>Delete</button>
          </>
        )}
      </div>
    );
  }
}

export default TaskItem;
