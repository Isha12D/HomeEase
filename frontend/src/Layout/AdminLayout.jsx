// AdminLayout.jsx
import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminContext } from '../Context/AdminContext';

const AdminLayout = () => {
  const { admin, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-800 text-white p-4 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold mb-6">
          {admin?.name?.[0].toUpperCase()}
        </div>
        <button
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          onClick={() => {
            logout();
            navigate("/admin/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-5/6 p-6 bg-gray-100">
        <Outlet /> {/* This renders whatever admin route is active */}
      </div>
    </div>
  );
};

export default AdminLayout;
