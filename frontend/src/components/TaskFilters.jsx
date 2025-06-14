// TaskFilters.jsx
import React from "react";

export default function TaskFilters({ activeFilter = {}, setActiveFilter = () => {} }) {
  return (
    <div className="flex gap-4 mb-4">
      <select
        className="border px-3 py-2 rounded text-sm"
        value={activeFilter.Status || ""}
        onChange={(e) =>
          setActiveFilter((prev) => ({ ...prev, Status: e.target.value || null }))
        }
      >
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Overdue">Overdue</option>
      </select>

      <select
        className="border px-3 py-2 rounded text-sm"
        value={activeFilter.Priority || ""}
        onChange={(e) =>
          setActiveFilter((prev) => ({ ...prev, Priority: e.target.value || null }))
        }
      >
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}
