// scripts/insertVotingOptions.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import VotingOption from "../models/votingOption.js";

dotenv.config();

const options = [
  "JavaScript", 
  "Python", 
  "TypeScript", 
  "Rust", 
  "Go", 
  "Java", 
  "C++", 
  "Kotlin", 
  "Swift", 
  "PHP"
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await VotingOption.deleteMany(); // optional: clean before insert
  await VotingOption.insertMany(options.map(name => ({ 
    name, 
    votes: Math.floor(Math.random() * 100) + 10 // Give it some initial life
  })));
  console.log("✅ Options with random votes inserted");
  process.exit();
});
