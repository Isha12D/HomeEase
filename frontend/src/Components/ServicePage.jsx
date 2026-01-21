import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "./BookingForm";

const ServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [showBooking, setShowBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/services/${id}`);
        if (!res.ok) throw new Error("Service not found");
        const data = await res.json();
        setService(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!service) return null;

  return (
    <>
    <div className="max-w-6xl mx-auto my-10 flex flex-col md:flex-row gap-8 p-6 bg-gray-900 text-white rounded-lg">
      <img
        src={service.img}
        alt={service.name}
        className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-lg"
      />
      <div className="md:w-1/2 flex flex-col gap-4">
        <h2 className="text-3xl font-bold">{service.name}</h2>
        <p className="text-yellow-400 font-semibold">⭐ {service.rating || 4.5}</p>
        <p>{service.description}</p>
        <p className="text-lg font-semibold">Price: ₹{service.price}</p>
        <button onClick={() => setShowBooking(true)} className="mt-4 bg-green-600 hover:bg-green-700 py-2 px-4 rounded w-32">
          Book Now
        </button>
      </div>
    </div>

    {/* Booking Form */}
      {showBooking && (
        <BookingForm
          service={service}
          onClose={() => setShowBooking(false)}
        />
      )}
    </>
  );
};

export default ServicePage;
