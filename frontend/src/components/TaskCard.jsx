import React from "react";
import { format } from "date-fns";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ task, onToggleStatus, onDelete }) {
  const navigate = useNavigate();

  const statusBadge = (status) => {
    const colorMap = {
      Pending: "bg-yellow-100 text-yellow-700",
      Completed: "bg-green-100 text-green-700",
      Overdue: "bg-red-100 text-red-700",
    };
    return `text-xs px-2 py-1 rounded-full font-medium ${
      colorMap[status] || "bg-gray-100 text-gray-600"
    }`;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 border border-gray-200 relative transition-all duration-300 ${
        task.status === "Completed" ? "opacity-60 blur-[1px]" : ""
      }`}
    >
      {/* Checkbox */}
      <label className="absolute top-2 left-2">
        <input
          type="checkbox"
          checked={task.status === "Completed"}
          onChange={() => onToggleStatus(task)}
          className="w-4 h-4 text-green-600 accent-green-600"
        />
      </label>

      <div className="pl-6">
        <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{task.description}</p>
        <div className="text-xs text-gray-500 mb-1">Category: {task.category}</div>
        <div className="text-xs text-gray-500 mb-1">Priority: {task.priority}</div>
        <div className="text-xs text-gray-500 mb-1">
          Due: {format(new Date(task.dueDate), "dd-MM-yyyy")}
        </div>

        <span className={statusBadge(task.status)}>{task.status}</span>

        <div className="flex justify-end gap-3 mt-4 text-gray-400">
          <button onClick={() => navigate(`/edit-task/${task._id}`)}>
            <FaEdit className="hover:text-blue-500" />
          </button>
          <button onClick={() => onDelete(task._id)}>
            <FaTrash className="hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
