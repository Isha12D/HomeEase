import React, { useState } from "react";
import PendingRequests from "./PendingRequests";
import ScheduledOrders from "./ScheduledOrders";
import CompletedOrders from "./CompletedOrders";

const ProviderProfile = () => {
  const [tab, setTab] = useState("pending");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 shadow">
        <button
          className={`block w-full mb-2 px-4 py-2 rounded ${
            tab === "pending" ? "bg-blue-600 text-white" : ""
          }`}
          onClick={() => setTab("pending")}
        >
          Incoming Requests
        </button>

        <button
          className={`block w-full mb-2 px-4 py-2 rounded ${
            tab === "scheduled" ? "bg-blue-600 text-white" : ""
          }`}
          onClick={() => setTab("scheduled")}
        >
          Scheduled Orders
        </button>

        <button
          className={`block w-full px-4 py-2 rounded ${
            tab === "completed" ? "bg-blue-600 text-white" : ""
          }`}
          onClick={() => setTab("completed")}
        >
          Completed Orders
        </button>
      </div>

      {/* Content */}
      <div className="w-3/4 p-6">
        {tab === "pending" && <PendingRequests />}
        {tab === "scheduled" && <ScheduledOrders />}
        {tab === "completed" && <CompletedOrders />}
      </div>
    </div>
  );
};

export default ProviderProfile;
