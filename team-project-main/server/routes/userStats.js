import express from "express";
import UserStats from "../models/UserStats.js";
import nodemailer from "nodemailer"; // For sending email notifications

const router = express.Router();

// Route to save quiz stats and update last active date
router.post("/api/user/stats", async (req, res) => {
  try {
    const { userId, score, accuracy, points, rank, solvedQuestions, streak, recentActivity, recentContests } = req.body;

    // Validation
    if (!userId || score === undefined || accuracy === undefined || points === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user and update their stats
    const userStats = await UserStats.findOneAndUpdate(
      { userId }, // Search by userId
      {
        $push: { quizStats: { score, accuracy, points, date: new Date() } }, // Add quiz stats to the array
        rank, // Update rank (or you can skip this if not updating rank each time)
        solvedQuestions, // Update solved questions count
        streak, // Update streak
        recentActivity, // Update recent activity (like quiz attempts)
        recentContests, // Update recent contests
        lastActiveDate: new Date(), // Update last active date
      },
      { upsert: true, new: true } // Create new record if not found, return updated record
    );

    return res.status(200).json({ message: "Stats saved successfully", userStats });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Fetch user stats for profile view
router.get("/api/user/stats/:userId", async (req, res) => {
  try {
    const userStats = await UserStats.findOne({ userId: req.params.userId });
    
    if (!userStats) {
      return res.json({ message: "User stats not found" });
    }

    return res.status(200).json({ userStats });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Route to update streak and send inactivity alert
router.post("/api/user/streak/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userStats = await UserStats.findOne({ userId });

    if (!userStats) {
      return res.status(404).json({ message: "User stats not found" });
    }

    const today = new Date();
    const lastActive = new Date(userStats.lastActiveDate);
    const diffDays = Math.ceil((today - lastActive) / (1000 * 3600 * 24));

    let streak = userStats.streak;

    // If the user hasn't been active for 7 days
    if (diffDays >= 7) {
      // Send email notification
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "raghuvarmakalidindi12345@gmail.com", // Your email
          pass: "raghu@123",   // Your email password
        },
      });

      const mailOptions = {
        from: "",
        to: userStats.userId.email, // Assuming `userId` has an `email` field
        subject: "Reminder: Inactivity Detected",
        text: `You haven't participated in any activities for 7 days. Please log in to keep your streak!`,
      };

      await transporter.sendMail(mailOptions);

      // Log the notification
      userStats.notifications.push({
        message: "You haven't participated in 7 days. An email reminder has been sent.",
      });
    }

    // Update streak based on participation
    if (diffDays === 1) {
      streak += 1; // Increment streak if active the previous day
    } else if (diffDays > 1) {
      streak = 1; // Reset streak if inactive for more than 1 day
    }

    // Update user stats with the new streak and last activity date
    userStats.streak = streak;
    userStats.lastActiveDate = today;
    await userStats.save();

    res.json({ streak, lastActiveDate: userStats.lastActiveDate });
  } catch (err) {
    console.error("Error updating streak:", err);
    res.status(500).json({ message: "Error updating streak." });
  }
});

export default router;