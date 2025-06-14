import React, { useState } from "react";
import { format } from "date-fns";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

export default function SortableRow({
  task,
  provided,
  checkedTasks,
  onToggleCheck,
  onSaveEdit,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSaveEdit(editedTask);
    setIsEditing(false);
  };

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Overdue: "bg-red-100 text-red-700",
  };

  const priorityColors = {
    High: "text-red-600",
    Medium: "text-orange-500",
    Low: "text-green-600",
  };

  const categoryColors = {
    Work: "bg-blue-100 text-blue-700",
    Personal: "bg-purple-100 text-purple-700",
    Health: "bg-green-100 text-green-700",
    Study: "bg-indigo-100 text-indigo-700",
  };

  return (
    <tr
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`border-b border-gray-200 hover:bg-gray-50 transition-all ${
        task.status === "Completed" ? "opacity-50 blur-[1px]" : ""
      }`}
    >
      <td className="p-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedTasks.includes(task._id)}
            onChange={() => onToggleCheck(task._id)}
            className="mx-auto"
          />
        </div>
      </td>

      <td className="p-3">
        {isEditing ? (
          <input
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
        ) : (
          task.title
        )}
      </td>

      <td className="p-3">
        {isEditing ? (
          <select
            name="category"
            value={editedTask.category}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Health</option>
            <option>Study</option>
          </select>
        ) : (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              categoryColors[task.category] || "bg-gray-100 text-gray-600"
            }`}
          >
            {task.category}
          </span>
        )}
      </td>

      <td className="p-3">
        {isEditing ? (
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        ) : (
          <span
            className={`flex items-center gap-1 ${
              priorityColors[task.priority] || "text-gray-500"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-current"></span>
            {task.priority}
          </span>
        )}
      </td>

      <td className="p-3">
        {isEditing ? (
          <input
            name="dueDate"
            type="date"
            value={format(new Date(editedTask.dueDate), "yyyy-MM-dd")}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          format(new Date(task.dueDate), "yyyy-MM-dd")
        )}
      </td>

      <td className="p-3">
        {isEditing ? (
          <select
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          >
            <option>Pending</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>
        ) : (
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              statusColors[task.status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {task.status}
          </span>
        )}
      </td>

      <td className="p-3 text-gray-500">
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button onClick={handleSave}>
                <FaSave className="hover:text-green-600" />
              </button>
              <button onClick={() => setIsEditing(false)}>
                <FaTimes className="hover:text-red-600" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)}>
                <FaEdit className="hover:text-blue-500" />
              </button>
              <button onClick={() => onDelete(task._id)}>
                <FaTrash className="hover:text-red-500" />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
