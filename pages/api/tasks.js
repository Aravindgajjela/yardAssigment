import { connectToDatabase } from "../../utils/db";
import { ObjectId } from "mongodb"; // ✅ Import ObjectId properly

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    switch (req.method) {
      case "GET": {
        const tasks = await db.collection("tasks").find().toArray();
        return res.status(200).json(tasks);
      }

      case "POST": {
        const { title, description, dueDate } = req.body;

        if (!title || !description || !dueDate) {
          return res.status(400).json({ message: "All fields are required" });
        }

        const newTask = { title, description, dueDate, completed: false };
        const result = await db.collection("tasks").insertOne(newTask);

        return res.status(201).json({ _id: result.insertedId, ...newTask });
      }

      case "PUT": {
        const { id, ...updateFields } = req.body;

        if (!id || !ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Valid Task ID is required" });
        }

        // Ensure only valid fields are updated
        const allowedFields = ["title", "description", "dueDate", "completed"];
        const updateData = {};
        allowedFields.forEach((field) => {
          if (updateFields[field] !== undefined) {
            updateData[field] = updateFields[field];
          }
        });

        if (Object.keys(updateData).length === 0) {
          return res.status(400).json({ message: "No valid fields to update" });
        }

        const updatedTask = await db.collection("tasks").findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updateData },
          { returnDocument: "after" }
        );

        if (!updatedTask.value) {
          return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json(updatedTask.value);
      }

      case "DELETE": {
        const { taskId } = req.body;

        if (!taskId || !ObjectId.isValid(taskId)) {
          return res.status(400).json({ message: "Valid Task ID is required" });
        }

        const result = await db.collection("tasks").deleteOne({ _id: new ObjectId(taskId) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ message: "Task deleted successfully" });
      }

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
