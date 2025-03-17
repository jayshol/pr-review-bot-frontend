import React, { useState } from 'react';
import axios from 'axios';
import './CodeReview.css';

const CodeReview = () => {
  const [code, setCode] = useState(''); // State for the pasted code
  const [review, setReview] = useState(''); // State for the returned review
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Function to handle the "Review" button click
  const handleReview = async () => {
    setLoading(true); // Set loading to true
    setReview(''); // Clear previous review
    try {
      const response = await axios.post('http://localhost:5001/api/review', {
        code: code, // Send the pasted code to the backend
      });

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
      </div> 
      {/* Div to display the review comments */}
      <div className='commentsBlock'>
        {formatted(review) || 'Your code is being reviewed. The review comments will be loaded shortly.'}
      </div>
    </div>
  );
};

export default CodeReview;
