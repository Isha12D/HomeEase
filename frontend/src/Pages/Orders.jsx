import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const STATUSES = [
  "pending",
  "scheduled",
  "in-progress",
  "completed",
  "cancelled",
];

const Orders = () => {
  const { token } = useAuth();
  const [activeStatus, setActiveStatus] = useState("pending");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:5000/api/bookings/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error(
          "Failed to fetch orders:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === bookingId
            ? { ...order, status: "cancelled" }
            : order
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  const filteredOrders = orders.filter(
    (order) => order.status === activeStatus
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-1/4 bg-white shadow p-4">
        <h2 className="text-lg font-bold mb-4">My Orders</h2>

        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`block w-full text-left px-4 py-2 rounded mb-2 capitalize
              ${
                activeStatus === status
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
          >
            {status.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="w-3/4 p-6">
        <h2 className="text-xl font-semibold capitalize mb-4">
          {activeStatus} Orders
        </h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 rounded shadow relative"
              >
                {/* THREE DOTS */}
                {order.status !== "completed" &&
                  order.status !== "cancelled" && (
                    <div className="absolute top-2 right-2">
                      <details className="relative">
                        <summary className="cursor-pointer text-xl">⋮</summary>
                        <div className="absolute right-0 mt-2 bg-white border rounded shadow w-36 z-10">
                          <button
                            onClick={() => cancelBooking(order._id)}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          >
                            Cancel Booking
                          </button>
                        </div>
                      </details>
                    </div>
                  )}

                <h3 className="font-bold">{order.service?.name}</h3>

                {order.provider && (
                  <p className="text-sm text-gray-600">
                    Provider: {order.provider.name} (
                    {order.provider.email})
                  </p>
                )}

                <p className="text-sm text-gray-600">
                  City: {order.city}
                </p>

                <p className="text-sm text-gray-600">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>

                <p className="text-sm">
                  Status:{" "}
                  <span className="font-semibold capitalize">
                    {order.status}
                  </span>
                </p>

                <p className="text-sm font-semibold mt-2">
                  ₹{order.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
