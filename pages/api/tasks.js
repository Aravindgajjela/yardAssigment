import { connectToDatabase } from '../../utils/db';
import { ObjectId } from 'mongodb'; // ✅ Import ObjectId properly

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET': {
      const tasks = await db.collection('tasks').find().toArray();
      return res.status(200).json(tasks);
    }

    case 'POST': {
      const { title, description, dueDate } = req.body;
      if (!title || !description || !dueDate) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const newTask = { title, description, dueDate, completed: false };
      const result = await db.collection('tasks').insertOne(newTask);
      return res.status(201).json({ _id: result.insertedId, ...newTask });
    }

    case 'PUT': {
      const { id, completed } = req.body;
      if (!id) {
        return res.status(400).json({ message: 'Task ID is required' });
      }

      const updatedTask = await db.collection('tasks').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { completed } }, // ✅ Only updates the completed field
        { returnDocument: 'after' }
      );

      if (!updatedTask.value) {
        return res.status(404).json({ message: 'Task not found' });
      }

      return res.status(200).json(updatedTask.value);
    }

    case 'DELETE': {
      const { taskId } = req.body;
      if (!taskId) {
        return res.status(400).json({ message: 'Task ID is required' });
      }

      const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(taskId) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }

      return res.status(200).json({ message: 'Task deleted successfully' });
    }

    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
