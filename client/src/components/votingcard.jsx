import React from "react";
import "./votingcard.css";

function VotingCard({ option, onVote, totalVotes }) {
  const percentage = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : 0;
  
  // Simple color generator based on name
  const colors = [
    '#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b'
  ];
  const colorIndex = option.name.length % colors.length;
  const accentColor = colors[colorIndex];

  return (
    <div className="voting-card card">
      <div className="card-accent" style={{ background: accentColor }}></div>
      <div className="card-header">
        <div className="candidate-avatar">
          {option.name.charAt(0)}
        </div>
        <div className="candidate-info">
          <h3>{option.name}</h3>
          <span className="candidate-label">Official Candidate</span>
        </div>
      </div>
      
      <div className="card-stats">
        <div className="stat-main">
          <span className="vote-count">{option.votes}</span>
          <span className="vote-label">Votes</span>
        </div>
        <div className="stat-percentage">{percentage}%</div>
      </div>

      <div className="vote-progress-container">
        <div 
          className="vote-progress-fill" 
          style={{ width: `${percentage}%`, background: accentColor }}
        ></div>
      </div>

      <button className="btn-primary vote-btn" onClick={onVote}>
        Cast Vote
      </button>
    </div>
  );
}

export default VotingCard;
