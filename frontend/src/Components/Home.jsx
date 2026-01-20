import React from "react";

const Home = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to HomeEase</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your one-stop platform for all on-demand home services.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Cleaning</h2>
          <p>Professional cleaning services for your home and office.</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Plumbing</h2>
          <p>Quick and reliable plumbing services whenever you need.</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Electrical</h2>
          <p>Certified electricians to handle all your electrical needs.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
