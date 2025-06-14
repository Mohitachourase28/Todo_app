import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function TaskForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/tasks", formData, {
        withCredentials: true,
      });

      toast.success("Task created successfully!");
      setTimeout(() => navigate("/dashboard"), 2200);
    } catch (err) {
      console.error("Task creation failed:", err);
      toast.error("Failed to create task.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded mt-1 h-24"
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded mt-1"
          >
            <option value="">Select</option>
            <option value="Work">Work</option>
            <option value="Meetings">Meetings</option>
            <option value="Personal">Personal</option>
            <option value="Projects">Projects</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded mt-1"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            required
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded mt-1"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition-colors duration-200 mt-4"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
