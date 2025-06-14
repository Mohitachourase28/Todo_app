// const tasks = [
//   { name: "Update project documentation", category: "Work", priority: "High", due: "2024-02-15", status: "Pending" },
//   { name: "Team meeting preparation", category: "Meetings", priority: "Medium", due: "2024-02-14", status: "Completed" },
//   { name: "Personal budget planning", category: "Personal", priority: "Low", due: "2024-02-16", status: "Pending" },
//   { name: "Website redesign project", category: "Projects", priority: "High", due: "2024-02-13", status: "Overdue" },
//   { name: "Client presentation draft", category: "Work", priority: "Medium", due: "2024-02-15", status: "Pending" },
// ];
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  updateTask,
  deleteTask,
  updateTaskOrder, // ✅ make sure this exists
} from "../features/taskSlice";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import SortableRow from "../components/SortableRow.jsx";
import { useOutletContext } from "react-router-dom";
import { isToday, isThisWeek, isPast, parseISO } from "date-fns";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeFilter, activeCategory } = useOutletContext();

  const {
    items: tasks = [],
    loading,
    error,
  } = useSelector((state) => state.tasks || {});

  const [checkedTasks, setCheckedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory = activeCategory
      ? task.category === activeCategory
      : true;

    // Existing filters...
    const matchesStatus = activeFilter?.Status
      ? task.status === activeFilter.Status
      : true;

    const matchesPriority = activeFilter?.Priority
      ? task.priority === activeFilter.Priority
      : true;

    const matchesDueDate = (() => {
      if (!activeFilter.DueDate || activeFilter.DueDate === "All") return true;
      const due = parseISO(task.dueDate);
      if (activeFilter.DueDate === "Today") return isToday(due);
      if (activeFilter.DueDate === "ThisWeek")
        return isThisWeek(due, { weekStartsOn: 1 });
      if (activeFilter.DueDate === "Overdue")
        return isPast(due) && task.status !== "Completed";
      return true;
    })();

    return (
      matchesCategory && matchesStatus && matchesPriority && matchesDueDate
    );
  });

  const handleSaveEdit = (updatedTask) => {
    if (!updatedTask.title || !updatedTask.dueDate) {
      alert("Title and due date are required");
      return;
    }

    const { _id, ...data } = updatedTask;
    dispatch(updateTask({ id: _id, data }));
    setEditingTaskId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const toggleChecked = (taskId) => {
    setCheckedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(filteredTasks);
    const [movedTask] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedTask);
    dispatch(updateTaskOrder(reordered));
  };

  if (loading)
    return (
      <div className="mt-20 text-center text-gray-500">Loading tasks...</div>
    );

  if (error)
    return <div className="mt-20 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="mt-16 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {activeCategory ? `${activeCategory} Tasks` : "All Tasks"}
        </h2>
        <button
          onClick={() => navigate("/new-task")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + New Task
        </button>
      </div>

      <div className="bg-white border border-gray-300 rounded-md overflow-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 border-b border-gray-300 text-center w-6">
                <input type="checkbox" disabled className="mx-auto" />
              </th>
              <th className="p-3 border-b border-gray-300">Task Name</th>
              <th className="p-3 border-b border-gray-300">Category</th>
              <th className="p-3 border-b border-gray-300">Priority</th>
              <th className="p-3 border-b border-gray-300">Due Date</th>
              <th className="p-3 border-b border-gray-300">Status</th>
              <th className="p-3 border-b border-gray-300">Actions</th>
            </tr>
          </thead>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="dashboard-tasks">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {filteredTasks.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-4 text-gray-500"
                      >
                        No tasks found.
                      </td>
                    </tr>
                  ) : (
                    filteredTasks.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <SortableRow
                            task={task}
                            index={index}
                            provided={provided}
                            checkedTasks={checkedTasks}
                            onToggleCheck={toggleChecked}
                            isEditing={editingTaskId === task._id}
                            onStartEdit={() => setEditingTaskId(task._id)}
                            onCancelEdit={() => setEditingTaskId(null)}
                            onSaveEdit={handleSaveEdit}
                            onDelete={handleDelete}
                          />
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
      </div>
    </div>
  );
}
