import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
export default function PRDashboard() {
  const [prs, setPrs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Flag to track component mount state
  
    const fetchPRs = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/prs", { timeout: 10000 });
        if (isMounted) setPrs(response.data); // Update state only if mounted
      } catch (error) {
        console.error("Error fetching PRs:", error);
      }
    };
  
    fetchPRs();
  
    return () => { isMounted = false; }; // Cleanup function to prevent state updates on unmount
  }, []);

  // Function to handle row click
  const handleRowClick = (prId, fileName) => {
    // Navigate to the detail page with PRId and fileName as params
    navigate(`/prDetails/${prId}/${fileName}`);
  };

  return (
    <div className="table-div">
      <h2 className="header-text">PR Dashboard</h2>
      <p className="subText">Click on a row for PR details</p>
      <div className='table-container'>
      <div className='header-row'>
        <div className='header-cell'>PRId</div>
        <div className='header-cell'>fileName</div>
        <div className='header-cell'>Last updated</div>
      </div>
      {prs.map((row, index) => (
        <div key={index} className='row' onClick={() => handleRowClick(row.prId, row.fileName)}>
          <div className='cell'>{row.prId}</div>
          <div className='cell'>{row.fileName}</div>
          <div className='cell'>{row.timestamp}</div>
        </div>
      ))}
    </div>
    </div>
  );
}

