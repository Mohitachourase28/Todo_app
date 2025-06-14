// File: frontend/src/components/LogoutButton.js
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
    localStorage.removeItem('isAuthenticated');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 hover:underline"
    >
      Logout
    </button>
  );
}

export default LogoutButton;