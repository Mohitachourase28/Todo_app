import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  updateTask,
  deleteTask,
  updateTaskOrder,
} from "../features/taskSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SortableRow from "../components/SortableRow.jsx";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { parseISO, isToday, isThisWeek, isPast } from "date-fns";

export default function MyTasks() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: tasks, loading } = useSelector((state) => state.tasks);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState([]);
  const { activeFilter, activeCategory } = useOutletContext();
  const filteredTasks = tasks.filter((task) => {
    const matchesUser = task.createdBy === user?._id;

    const matchesCategory = activeCategory
      ? task.category === activeCategory
      : true;

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
      matchesUser &&
      matchesCategory &&
      matchesStatus &&
      matchesPriority &&
      matchesDueDate
    );
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

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

  const handleSaveEdit = (updatedTask) => {
    if (!updatedTask.title || !updatedTask.dueDate) {
      alert("Title and due date are required");
      return;
    }

    const { _id, ...data } = updatedTask;
    dispatch(updateTask({ id: _id, data }));
    setEditingTaskId(null);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(tasks);
    const [movedTask] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedTask);
    dispatch(updateTaskOrder(reordered));
  };

  if (loading) {
    return <div className="text-center mt-10">Loading tasks...</div>;
  }

  return (
    <div className="mt-16 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">My Tasks</h2>
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
            <Droppable droppableId="task-list" direction="vertical">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {filteredTasks.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <SortableRow
                          task={task}
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
                  ))}
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
