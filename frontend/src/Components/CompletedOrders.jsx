import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import React, { useEffect, useState } from "react";

const CompletedOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(
      "http://localhost:5000/api/bookings/provider/completed",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((res) => setOrders(res.data));
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {orders.length === 0 ? (
        <p className="text-gray-500">No completed orders yet.</p>
      ) : (
        orders.map((o) => (
          <div
            key={o._id}
            className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">
                {o.service?.name}
              </h3>
              <span className="text-sm text-green-600 font-semibold">
                Completed
              </span>
            </div>

            <p className="text-sm text-gray-600">
              Customer: <span className="font-medium">{o.user?.name}</span>
            </p>

            <p className="text-sm text-gray-600">
              City: {o.city}
            </p>

            <p className="text-sm text-gray-600">
              Date: {new Date(o.date).toLocaleDateString()}
            </p>

            <p className="mt-3 font-semibold text-blue-600">
              ₹{o.price}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedOrders;
