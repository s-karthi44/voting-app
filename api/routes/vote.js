import express from "express";
import VotingOption from "../models/votingOption.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/results", async (req, res) => {
  try {
    const options = await VotingOption.find().sort({ votes: -1 });
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: "Error fetching results", error: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { language } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.hasVoted) return res.status(400).json({ message: "You already voted" });

    const option = await VotingOption.findOne({ name: language });
    if (!option) return res.status(404).json({ message: `Language "${language}" not found` });

    option.votes += 1;
    await option.save();

    user.hasVoted = true;
    await user.save();

    res.status(200).json({ message: "✅ Vote submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "❌ Voting failed", error: err.message });
  }
});

export default router;
