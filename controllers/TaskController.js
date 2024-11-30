import Task  from '../models/Task.js';

class TaskController {
  // Create a task
  static async createTask(req, res) {
    try {
      const task = new Task({ ...req.body, user: req.user.id });
      console.log(task);
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all tasks
 // Get all tasks, with optional search filter
// Get all tasks with optional filters
static async getTasks(req, res) {
  try {
    const { search, priority, startDate, endDate } = req.query; // Extract filters from query params

    let filter = { user: req.user.id }; // Start with filtering by user

    // Apply search filter if search query is provided
    if (search) {
      filter = {
        ...filter,
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      };
    }

    // Apply priority filter if provided
    if (priority) {
      filter.priority = priority;
    }

    // Apply date range filter if startDate and endDate are provided
    if (startDate && endDate) {
      filter.deadline = {
        $gte: new Date(startDate), // Greater than or equal to startDate
        $lte: new Date(endDate),   // Less than or equal to endDate
      };
    } else if (startDate) {
      // If only startDate is provided, filter tasks after this date
      filter.deadline = { $gte: new Date(startDate) };
    } else if (endDate) {
      // If only endDate is provided, filter tasks before this date
      filter.deadline = { $lte: new Date(endDate) };
    }

    // Fetch filtered tasks from the database
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

  // Get a single task by ID
  static async getTaskById(req, res) {
    try {
      const { taskId } = req.params; // Extract taskId from the URL

      // Fetch the task from the database
      const task = await Task.findOne({ _id: taskId, user: req.user.id });

      // Check if task exists
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      // Respond with the task details
      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }



  // Update a task
  static async updateTask(req, res){
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a task
  static async deleteTask(req, res) {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default TaskController;
