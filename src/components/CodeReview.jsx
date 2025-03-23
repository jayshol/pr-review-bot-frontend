import React, { useState } from 'react';
import axios from 'axios';
import './CodeReview.css';
import { v4 as uuidv4 } from "uuid";
import { formatted } from '../utils/utils';

const CodeReview = () => {
  const [code, setCode] = useState(''); // State for the pasted code
  const [review, setReview] = useState(''); // State for the returned review
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Function to handle the "Review" button click
  const handleReview = async () => {
    setLoading(true); // Set loading to true
    setReview(''); // Clear previous review
    try {
      const response = await axios.post('https://pr-review-bot-backend-production.up.railway.app/api', {
        code: code, // Send the pasted code to the backend
      });
      console.log(response.data.review);
      setReview(response.data.review); // Update review with response from backend
    } catch (error) {
      console.error(error);
      setReview('An error occurred while fetching the review.');
    }
    setLoading(false); // Set loading to false
  };

  const handleClear = () => {
    setCode('');
    setReview('');
  }

  const handleSaveReview = async () => {
    const prId = uuidv4(); // Auto-generate PR ID
    // const finalFileName = fileName || `file-${Date.now()}.js`; // Default filename
    const finalFileName = `file-${Date.now()}.js`;
    try {
      const response = await axios.post("https://pr-review-bot-backend-production.up.railway.app/api/savereview", {
        prId,
        fileName: finalFileName,
        fileContent: code,
        reviewComments: review, // Convert comments into an array
      });

      alert("Review saved successfully!");
      console.log("Saved Review:", response.data);
    } catch (error) {
      console.error("Error saving review:", error);
      alert("Failed to save review.");
    }
  };
/*
  const formatted = (review) => {
    if(review !== ''){
      const points = review.split('\n').filter(line => line.trim() !== '');
      // Use a Map to dynamically group related points
      const categoriesMap = new Map();

      points.forEach(point => {
          // Extract key phrase for potential category (e.g., first few words)
          const keyPhrase = point.split(':')[0].split('. ')[1]; // Get the main descriptor
          const keyText = point.split(':')[1]
          const category = keyPhrase || "Uncategorized"; // Default to 'Uncategorized' if no descriptor

          if (!categoriesMap.has(category)) {
              categoriesMap.set(category, []); // Create a new category if it doesn't exist
          }
          categoriesMap.get(category).push(keyText); // Add the point to its category
      });

      // Display the parsed points with generated headings
      // Build formatted HTML
      
      return Array.from(categoriesMap.entries()).map(([heading, items]) => (
        <div key={heading}>
          <h3>{heading}</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )); 
    }
  }
*/
  return (
    <div className='ReviewForm'>
      <h1>Code Review Bot</h1>
      {/* Text area for pasting code */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)} // Update state as user types
        placeholder="Paste your code here..."
        rows="10"
        cols="50"
      />
      {/* Review and clear buttons */}
      <div className='buttonContainer'>
        <button
          onClick={handleReview}
          disabled={loading}
        >
          {loading ? 'Reviewing...' : 'Review'}
        </button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSaveReview}>SaveReview</button> 
      </div>
      {/* Div to display the review comments */}
      <div className='commentsBlock'>
        {formatted(review) || <p>The review comments will be loaded here.</p>}
      </div>
    </div>
  );
};

export default CodeReview;
