import Task from "../models/Task.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;

    if (!title || !priority || !dueDate) {
      return res.status(400).json({ error: "Title, due date, and priority are required." });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      category,
      user: req.userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Create Task Error:", error.message);
    res.status(500).json({ error: "Failed to create task." });
  }
};

// Get all tasks (with optional filters)
export const getTasks = async (req, res) => {
  try {
    const { status, priority, category } = req.query;

    const filter = { user: req.userId };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    const tasks = await Task.find(filter).sort({ dueDate: 1 }); // sorted by due date
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error.message);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });

    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Get Task Error:", error.message);
    res.status(500).json({ error: "Failed to retrieve task." });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found or not authorized." });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Update Task Error:", error.message);
    res.status(500).json({ error: "Failed to update task." });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Task not found or not authorized." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Delete Task Error:", error.message);
    res.status(500).json({ error: "Failed to delete task." });
  }
};

export const reorderTasks = async (req, res) => {
  const { taskIds } = req.body;

  if (!Array.isArray(taskIds)) {
    return res.status(400).json({ error: "Invalid taskIds format." });
  }

  try {
    const bulkOps = taskIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id, user: req.userId },
        update: { order: index },
      },
    }));

    await Task.bulkWrite(bulkOps);

    const updatedTasks = await Task.find({ user: req.userId }).sort("order");
    res.status(200).json(updatedTasks);
  } catch (error) {
    console.error("❌ Reorder Task Error:", error.message);
    res.status(500).json({ error: "Failed to reorder tasks." });
  }
};

