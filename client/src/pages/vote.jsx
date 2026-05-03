import React, { useEffect, useState } from "react";
import axios from "axios";
import VotingCard from "../components/votingcard";
import "./vote.css";

function Vote() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  const fetchResults = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/vote/results`);
      setOptions(res.data);
      const total = res.data.reduce((acc, curr) => acc + curr.votes, 0);
      setTotalVotes(total);
      setLoading(false);
    } catch (err) {
      console.error("Error loading results", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    // Poll for results every 10 seconds for a "live" feel
    const interval = setInterval(fetchResults, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (language) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to vote");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/vote`, { language }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message);
      fetchResults();
    } catch (err) {
      alert(err.response?.data?.message || "Voting failed");
    }
  };

  if (loading) {
    return (
      <div className="vote-page container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vote-page">
      <header className="vote-header container">
        <div className="animate-fade-in">
          <h1 className="gradient-text">Cast Your Vote</h1>
          <p className="subtitle">Select your favorite programming language. Current total: <strong>{totalVotes}</strong> votes.</p>
        </div>
      </header>

      <div className="container">
        <div className="candidates-grid">
          {options.map((option, idx) => (
            <VotingCard
              key={idx}
              option={{ name: option.name, votes: option.votes }}
              onVote={() => handleVote(option.name)}
              totalVotes={totalVotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vote;
