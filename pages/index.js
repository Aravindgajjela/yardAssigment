// /pages/index.js
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function Home() {
  const handleTaskAdded = (newTask) => {
    // Optionally update state here to show newly added tasks
  };

  return (
    <div>
      <h1>Task Management</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList />
    </div>
  );
}
