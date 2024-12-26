import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import DbCon from './utlis/db.js';
import AuthRoutes from './routes/Auth.js';
import QuestionRoutes from './routes/Question.js';
import AdminRoutes from './models/AdminRoutes.js'; // Fixed path
import ContestRoutes from './routes/contestRoutes.js';
import UserStats from './models/UserStats.js';
import UserStatsRoutes from './routes/userStats.js';
import jwt from "jsonwebtoken";
import UserModel from './models/user.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Connect to the database
DbCon();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Enhanced CORS configuration
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5174', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  })
);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profileImages/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/questions', QuestionRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/contests', ContestRoutes);
app.use('/api/stats', UserStatsRoutes);

// Profile Retrieval API

// app.get("/api/stats/profile", async (req, res) => {
//   try {
//     const token = req.cookies?.token; // Check if token exists in cookies
//     if (!token) {
//       return res.status(403).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token

//     const stats = await UserStats.findOne({ userId: decoded.userId }); // Find user stats
//     if (!stats) {
//       return res.status(204).json({ message: "Stats not found for this user" });
//     }

//     res.status(200).json(stats); // Send stats
//   } catch (err) {
//     console.error("Error fetching profile stats:", err.message);
//     res.status(500).json({ message: "Error fetching stats", error: err.message });
//   }
// });

// Find User Profile API


app.get('/api/findProfile', async (req, res) => {
  try {
    const token = req.cookies?.token; // Read token from cookies
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
    const userData = await UserModel.findOne({ _id: decoded.userId }); // Fetch user data

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userData); // Send user data
  } catch (error) {
    console.error('Error retrieving profile:', error.message);
    res.status(500).json({ message: 'Error retrieving profile', error: error.message });
  }
});

// Update User Profile API
app.put('/api/updateProfile', async (req, res) => {
  try {
    const token = req.cookies?.token; // Read token from cookies
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT

    const { name, phone, email, gender, address, department, domain } = req.body;

    const updatedData = await UserModel.findOneAndUpdate(
      { _id: decoded.userId }, // Find user by ID
      { name, phone, email, gender, address, department, domain }, // Update fields
      { new: true } // Return the updated document
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedData); // Send updated data
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Health Check Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
