import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const AddService = () => {
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    description: "",
    price: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/add-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setMessage("Service added successfully!");
        setFormData({ name: "", img: "", description: "", price: "" });
      } else {
        const data = await res.json();
        setMessage(data.message || "Failed to add service");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 10, bgcolor: "white", borderRadius: 2 }}>
      <Typography variant="h5" mb={3}>
        Add New Service
      </Typography>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <TextField
          label="Service Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Image URL"
          name="img"
          value={formData.img}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          required
        />
        <TextField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          required
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Add Service
        </Button>
      </form>

      {message && <Typography mt={2}>{message}</Typography>}
    </Box>
  );
};

export default AddService;
