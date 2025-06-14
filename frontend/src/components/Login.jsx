/* eslint-disable no-unused-vars */
// File: frontend/src/components/Login.js
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password, rememberMe },
        { withCredentials: true }
      );
      await dispatch(fetchUser());  // fetchUser sets isAuthenticated via Redux
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

   return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2 text-blue-600">FocusFlow</h1>
        <p className="text-gray-500 text-center mb-6">Welcome back<br />Please enter your details to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between text-xs mt-1">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-blue-500"
                />
                Remember me
              </label>
              <button type="button" className="text-blue-500 hover:underline">Forgot password?</button>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Sign in
          </button>
        </form>

        {/* <div className="flex items-center my-4 text-gray-400">
          <div className="flex-grow border-t"></div>
          <span className="px-2 text-sm">or continue with</span>
          <div className="flex-grow border-t"></div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button> */}

        <p className="text-center text-sm mt-4">
          Don’t have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
        </p>

        <p className="text-center text-xs text-gray-400 mt-4">© 2025 Brand. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Login;
