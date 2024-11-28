// server.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const placeRoutes = require('./routes/PlaceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
require('dotenv').config();

const cors = require('cors');
const axios = require('axios');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

const getAuthToken = async () => {
    const url = "https://test.api.amadeus.com/v1/security/oauth2/token";
    const data = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET,
    });
  
    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      console.log("Token fetched successfully:", response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching token:", error.response?.data || error.message);
      throw new Error("Failed to fetch token");
    }
  };
  
  app.get("/api/hotels", async (req, res) => {
    try {
      const token = await getAuthToken();
      const cityCode = "NYC"; // Example: Change this to a known city code if necessary
  
      const response = await axios.get(
        `https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=Lucknow}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Hotels fetched successfully:", response.data);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(
        "Error fetching hotels:",
        error.response?.data || error.message
      );
      res.status(500).json({ error: "Failed to fetch hotels" });
    }
  });

app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/booking', bookingRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
