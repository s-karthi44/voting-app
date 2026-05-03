// models/vote.js
import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  language: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Vote = mongoose.models.Vote || mongoose.model("Vote", voteSchema);

export default Vote;
