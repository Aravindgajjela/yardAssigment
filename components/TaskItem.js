import React, { Component } from "react";
import EditTaskModal from "./EditTaskModal"; // Import modal component


class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: props.task.completed,
      showModal: false, // State to control modal visibility
    };
  }

  toggleCompletion = async () => {
    const { _id } = this.props.task;
    const newStatus = !this.state.completed;

    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        body: JSON.stringify({ id: _id, completed: newStatus }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        this.setState({ completed: newStatus });
        this.props.onUpdate(_id, { completed: newStatus });
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  deleteTask = async () => {
    const { _id } = this.props.task;

    try {
      const response = await fetch("/api/tasks", {
        method: "DELETE",
        body: JSON.stringify({ taskId: _id }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        this.props.onDelete(_id);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleSave = async (updatedTask) => {
    const { _id } = this.props.task;

    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        body: JSON.stringify({ id: _id, ...updatedTask }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        this.setState({ showModal: false });
        this.props.onUpdate(_id, updatedTask);
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  render() {
    const { task, index } = this.props;
    const { completed, showModal } = this.state;

    return (
      <>
        <tr className={completed ? "completed" : ""}>
          <td>{index + 1}</td>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.dueDate}</td>
          <td>
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={this.toggleCompletion}
              />
              {completed ? "Completed" : "Incomplete"}
            </label>
          </td>
          <td>
            <button onClick={this.toggleModal}>Edit</button>
            <button onClick={this.deleteTask}>Delete</button>
          </td>
        </tr>

        {showModal && (
          <EditTaskModal
            task={task}
            onSave={this.handleSave}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}

export default TaskItem;
