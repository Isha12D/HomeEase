import axios from "axios";
import  { useAuth } from "../Context/AuthContext";
import React, { useEffect, useState } from "react";

const PendingRequests = () => {
  const { token , user} = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings/pending", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRequests(res.data));
  }, [token]);

  const acceptBooking = async (id) => {
    await axios.put(
      `http://localhost:5000/api/bookings/${id}/accept`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setRequests((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="space-y-4">
      {requests.map((b) => (
        <div key={b._id} className="bg-white p-4 rounded shadow">
          <h3 className="font-bold">{b.service.name}</h3>
          <p>User: {b.user.name}</p>
          <p>City: {b.city}</p>

          <button
            onClick={() => acceptBooking(b._id)}
            className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
          >
            Accept
          </button>
        </div>
      ))}
    </div>
  );
};

export default PendingRequests;
