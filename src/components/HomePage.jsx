import React from "react";
import "./HomePage.css";

function Home() {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Codepal</h1>
        <p>Your Reliable Pull Request Assistant 🚀</p>
      </header>
      <section className="homepage-section">
        <h2>What We Offer:</h2>
        <ul>
          <li>Automated Code Analysis: Spot potential issues and improve code quality.</li>
          <li>Speed & Efficiency: Instant feedback to accelerate your workflow.</li>
          <li>Team Collaboration: Prioritize reviews for effective communication.</li>
        </ul>
        <h2>Why Choose Codepal?</h2>
        <p>
          Pull requests don’t have to sit idle. Codepal bridges the gap
          between coding and collaboration by providing actionable insights
          when you need them. Our bot works around the clock so your team can
          focus on building the features that matter most.
        </p>
      </section>
      <footer className="homepage-footer">
        <p>&copy; 2025 Codepal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
