import React, { useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AdminContext } from "../Context/AdminContext";

const AdminLayout = () => {
  const { admin, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // ⬅️ back to home
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        {/* Admin info */}
        <div className="flex flex-col items-center p-6 border-b border-gray-700">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold mb-2">
            {admin?.name?.[0]?.toUpperCase()}
          </div>
          <p className="text-sm text-gray-300">{admin?.name}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin/add-service"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            ➕ Add Service
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            🚨 Reports
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
