import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "../Context/AuthContext";

const BookingForm = ({ service, onClose }) => {
  const { user, token } = useAuth();
  const today = new Date().toISOString().split("T")[0];


  const [formData, setFormData] = useState({
    city: "",
    address: "",
    date: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      setMessage("Please login to book a service");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          serviceId: service._id,
          //userId: user._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Booking created successfully!");
        setTimeout(onClose, 800);
      } else {
        setMessage(data.message || "Failed to create booking");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        bgcolor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          p: 4,
          bgcolor: "white",
          borderRadius: 2,
          width: "90%",
          maxWidth: 500,
          position: "relative",
        }}
      >
        <Button
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          ✕
        </Button>

        <Typography variant="h6" mb={2}>
          Book Service: {service.name}
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <TextField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: today,
            }}
            required
          />

          <Button variant="contained" type="submit">
            Book Now
          </Button>
        </form>

        {message && (
          <Typography mt={2} color="success.main">
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BookingForm;
