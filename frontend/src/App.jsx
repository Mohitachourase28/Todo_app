// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchUser } from './features/authSlice';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import ProtectedRoute from './components/ProtectedRoute';
// // import LogoutButton from './components/LogoutButton';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import axios from 'axios';

// function DashboardLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const toggleSidebar = () => setSidebarOpen(prev => !prev);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
//       <Sidebar sidebarOpen={sidebarOpen} />
//       <Dashboard />
//     </div>
//   );
// }

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchUser());

//     const interval = setInterval(async () => {
//       try {
//         await axios.get('http://localhost:5000/api/auth/refresh', { withCredentials: true });
//         dispatch(fetchUser());
//       } catch {
//         console.warn("Token refresh failed");
//       }
//     }, 10 * 60 * 1000);

//     return () => clearInterval(interval);
//   }, [dispatch]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/authSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TaskForm from "./pages/TaskForm";
import axios from "axios";
import MyTasks from "./pages/MyTasks.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());

    const interval = setInterval(async () => {
      try {
        await axios.get("http://localhost:5000/api/auth/refresh", {
          withCredentials: true,
        });
        dispatch(fetchUser());
      } catch {
        console.warn("Token refresh failed");
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="my-tasks"
            element={
              <ProtectedRoute>
                <MyTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="new-task"
            element={
              <ProtectedRoute>
                <TaskForm />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
