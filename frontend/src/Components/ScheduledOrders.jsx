import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const ScheduledOrders = () => {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchScheduled = async () => {
        const res = await axios.get("http://localhost:5000/api/bookings/provider/scheduled", {
    headers: { Authorization: `Bearer ${token}` },
    });


    setOrders(res.data.filter((b) => b.status === "scheduled"));
  };

  useEffect(() => {
    fetchScheduled();
  }, []);

  const markCompleted = async (id) => {
    await axios.put(
      `http://localhost:5000/api/bookings/${id}/complete`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setOrders((prev) => prev.filter((o) => o._id !== id));
  };

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <p className="text-gray-500">No scheduled orders.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded shadow"
          >
            <h3 className="font-bold">{order.service?.name}</h3>
            <p className="text-sm text-gray-600">Customer Name: {order.name}</p>
            <p className="text-sm text-gray-600">
              City: {order.city}
            </p>

            <p className="text-sm text-gray-600">
              Date: {new Date(order.date).toLocaleDateString()}
            </p>

            <p className="font-semibold mt-2">₹{order.price}</p>

            {user?.role === "provider" && (
            <div className="mt-3 flex items-center gap-2">
                <input
                type="checkbox"
                onChange={() => markCompleted(order._id)}
                />
                <span className="text-sm">
                Mark booking as completed
                </span>
            </div>
            )}

          </div>
        ))
      )}
    </div>
  );
};

export default ScheduledOrders;
