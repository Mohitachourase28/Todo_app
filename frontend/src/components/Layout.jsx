import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState({
    Status: "",
    Priority: "",
    DueDate: "",
  });
  const [activeCategory, setActiveCategory] = useState("");
  return (
    <div className="flex flex-col h-screen">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(false)}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
              activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        />
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          <Outlet context={{ activeFilter, activeCategory }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
