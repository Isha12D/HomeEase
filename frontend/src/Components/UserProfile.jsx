import React from "react";
import { useAuth } from "../Context/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
          {user.name?.[0]}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <p className="text-gray-700">
        City: <span className="font-medium">{user.city || "N/A"}</span>
      </p>
    </div>
  );
};

export default UserProfile;
