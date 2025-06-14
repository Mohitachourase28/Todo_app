import {
  HiX,
  HiHome,
  HiViewList,
  HiCalendar,
  HiChartBar,
} from "react-icons/hi";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useState } from "react";

// const filterOptions = {
//   Status: ["Pending", "Completed", "Overdue"],
//   Priority: ["High", "Medium", "Low"],
//   DueDate: ["Today", "Tomorrow", "This Week", "Next Week"], // Just for UI — you'll filter logic later
// };

const Sidebar = ({
  isOpen,
  toggleSidebar,
  activeCategory,
  setActiveCategory,
  activeFilter,
  setActiveFilter,
}) => {
  const initialCategories = [
  { name: "Work", color: "bg-blue-400" },
  { name: "Personal", color: "bg-green-400" },
  { name: "Projects", color: "bg-purple-400" },
  { name: "Meetings", color: "bg-yellow-400" },
];
  const [categories, setCategories] = useState(initialCategories);
  const [showNewCatInput, setShowNewCatInput] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  
  const handleAddCategory = () => {
    if (!newCatName.trim()) return;

    const newCategory = {
      name: newCatName.trim(),
      color: "bg-gray-500", // Default color or generate randomly
    };

    setCategories([...categories, newCategory]);
    setNewCatName("");
    setShowNewCatInput(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={classNames(
          "bg-white border border-gray-300 w-64 z-40 lg:static fixed h-full top-0 left-0 p-4 transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          },
          "lg:translate-x-0"
        )}
      >
        <button
          className="absolute top-4 right-4 text-2xl lg:hidden"
          onClick={toggleSidebar}
        >
          <HiX />
        </button>

        <div className="mb-6 mt-2 text-xl font-bold flex items-center gap-2">
          <span className="text-gray-800">TaskFlow</span>
        </div>

        <nav className="space-y-2 mb-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <HiHome /> Dashboard
          </Link>

          <Link
            to="/my-tasks"
            className="flex items-center gap-2 px-3 py-2 rounded text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <HiViewList /> My Tasks
          </Link>

          {/* <Link
            to="/calendar"
            className="flex items-center gap-2 px-3 py-2 rounded text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <HiCalendar /> Calendar
          </Link>

          <Link
            to="/reports"
            className="flex items-center gap-2 px-3 py-2 rounded text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <HiChartBar /> Reports
          </Link> */}
        </nav>

         {/* Categories */}
      <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Categories
      </div>
      <ul className="space-y-1 mb-4">
        {categories.map((cat) => (
          <li key={cat.name}>
            <button
              onClick={() => setActiveCategory(cat.name)}
              className={classNames(
                "flex items-center gap-2 px-3 py-1.5 rounded text-sm w-full text-left",
                activeCategory === cat.name
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <span className={`w-2 h-2 rounded-full ${cat.color}`}></span>
              {cat.name}
            </button>
          </li>
        ))}
        <li>
          {showNewCatInput ? (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="border px-2 py-1 rounded text-sm w-full"
                placeholder="New category"
              />
              <button
                onClick={handleAddCategory}
                className="text-blue-600 text-sm hover:underline"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowNewCatInput(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-blue-600 text-sm hover:underline"
            >
              + New Category
            </button>
          )}
        </li>
      </ul>

        <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Filters
        </div>

        <div className="space-y-2">
          {["Status", "Priority", "DueDate"].map((filter) => (
            <select
              key={filter}
              value={activeFilter?.[filter] || ""}
              onChange={(e) =>
                setActiveFilter((prev) => ({
                  ...prev,
                  [filter]: e.target.value,
                }))
              }
              className="w-full border border-gray-400 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">{filter}</option>
              {filter === "Status" && (
                <>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Overdue">Overdue</option>
                </>
              )}
              {filter === "Priority" && (
                <>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </>
              )}
              {filter === "DueDate" && (
                <>
                  <option value="Today">Today</option>
                  <option value="ThisWeek">This Week</option>
                  <option value="Overdue">Overdue</option>
                </>
              )}
            </select>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
