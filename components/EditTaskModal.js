import React, { Component } from "react";


class EditTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedTask: { ...props.task }, // Initialize state with task props
    };
  }

  handleChange = (e) => {
    this.setState({
      updatedTask: { ...this.state.updatedTask, [e.target.name]: e.target.value },
    });
  };

  handleSave = () => {
    this.props.onSave(this.state.updatedTask);
  };

  render() {
    const { onClose } = this.props;
    const { updatedTask } = this.state;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Task</h2>
          <input
            type="text"
            name="title"
            value={updatedTask.title}
            onChange={this.handleChange}
          />
          <textarea
            name="description"
            value={updatedTask.description}
            onChange={this.handleChange}
          />
          <input
            type="date"
            name="dueDate"
            value={updatedTask.dueDate}
            onChange={this.handleChange}
          />
          <div className="modal-actions">
            <button className="save-btn" onClick={this.handleSave}>Save</button>
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTaskModal;
