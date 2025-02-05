// /pages/api/tasks.js

import { connectToDatabase } from '../../utils/db';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      const tasks = await db.collection('tasks').find().toArray();
      return res.status(200).json(tasks);

    case 'POST':
      const { title, description, dueDate } = req.body;
      const newTask = { title, description, dueDate, completed: false };
      await db.collection('tasks').insertOne(newTask);
      return res.status(201).json(newTask);

    case 'PUT':
      const { id, completed } = req.body;
      await db.collection('tasks').updateOne(
        { _id: new ObjectId(id) },
        { $set: { completed } }
      );
      return res.status(200).json({ id, completed });

    case 'DELETE':
      const { taskId } = req.body;
      await db.collection('tasks').deleteOne({ _id: new ObjectId(taskId) });
      return res.status(200).json({ taskId });

    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
