import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/services");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <section className="bg-black text-white py-14">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Services</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
          {services.map((service) => (
            <div
              key={service._id}
              onClick={() => navigate(`/services/${service._id}`)}
              className="flex flex-col items-center gap-4 hover:scale-105 transition cursor-pointer"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden">
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-center text-sm font-medium">{service.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
