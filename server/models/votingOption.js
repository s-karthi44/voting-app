// models/votingOption.js
import mongoose from "mongoose";

const votingOptionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  votes: { type: Number, default: 0 }
});

const VotingOption = mongoose.models.VotingOption || mongoose.model("VotingOption", votingOptionSchema);
export default VotingOption;
