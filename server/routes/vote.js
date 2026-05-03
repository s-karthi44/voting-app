// routes/vote.js
import express from "express";
import VotingOption from "../models/votingOption.js";
import authMiddleware from "../middeleware/authmiddleware.js"; // ✅ FIXED path (check spelling!)
import User from "../models/user.js";

const router = express.Router();

// ✅ GET: Get voting results
router.get("/results", async (req, res) => {
  try {
    const options = await VotingOption.find().sort({ votes: -1 });
    res.json(options);
  } catch (err) {
    console.error("❌ Error fetching vote results:", err.message);
    res.status(500).json({ message: "Error fetching results", error: err.message });
  }
});

// ✅ POST: Submit a vote
router.post("/", authMiddleware, async (req, res) => {
  const { language } = req.body;
  const userId = req.userId;

  try {
    console.log("📨 Vote request received for:", language);

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.hasVoted) return res.status(400).json({ message: "You already voted" });

    // Find voting option by language
    const option = await VotingOption.findOne({ name: language });
    if (!option) return res.status(404).json({ message: `Language "${language}" not found` });

    // Update vote count
    option.votes += 1;
    await option.save();

    // Mark user as voted
    user.hasVoted = true;
    await user.save();

    console.log(`✅ Vote submitted for "${language}" by user: ${user.email}`);
    res.status(200).json({ message: "✅ Vote submitted successfully" });

  } catch (err) {
    console.error("❌ Voting error:", err.message);
    res.status(500).json({ message: "❌ Voting failed", error: err.message });
  }
});

export default router;
