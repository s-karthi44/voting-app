// models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: String,
  password: { type: String, required: true },
  hasVoted: { type: Boolean, default: false }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
