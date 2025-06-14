import { HiMenu } from "react-icons/hi";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";

export default function Navbar({ toggleSidebar }) {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 bg-white fixed z-20">
      <div className="flex items-center gap-2">
        <button className="md:hidden text-2xl" onClick={toggleSidebar}>
          <HiMenu />
        </button>
        <h1 className="text-xl font-semibold text-gray-700 hidden md:block">
          TaskFlow
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <span className="text-sm text-gray-600 hidden sm:inline">
          {loading ? "Loading..." : user?.name || "Guest"}
        </span>

        {!loading && user && (
          <LogoutButton />
        )}
      </div>
    </nav>
  );
}
