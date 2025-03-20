import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { Table, TableHead, TableRow, TableCell, TableBody, Card } from "@/components/ui";

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
    console.log(prId);
    // Navigate to the detail page with PRId and fileName as params
    navigate(`/prDetails/${prId}/${fileName}`);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">PR Dashboard</h2>
      <div style={styles.tableContainer}>
      <div style={styles.headerRow}>
        <div style={styles.headerCell}>PRId</div>
        <div style={styles.headerCell}>fileName</div>
        <div style={styles.headerCell}>Last updated</div>
      </div>
      {prs.map((row, index) => (
        <div key={index} style={styles.row} onClick={() => handleRowClick(row.prId, row.fileName)}>
          <div style={styles.cell}>{row.prId}</div>
          <div style={styles.cell}>{row.fileName}</div>
          <div style={styles.cell}>{row.timestamp}</div>
        </div>
      ))}
    </div>
    </div>
  );
}

// Inline CSS styles using Flexbox
const styles = {
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ddd",
    borderRadius: "5px",
    maxWidth: "600px",
    margin: "20px auto",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  headerRow: {
    display: "flex",
    backgroundColor: "#f4f4f4",
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    padding: "10px",
    borderRight: "1px solid #ddd",
  },
  row: {
    display: "flex",
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    padding: "10px",
    borderRight: "1px solid #ddd",
  },
};

// Remove border on the last cell of each row
styles.headerCell.borderRight = "none";
styles.cell.borderRight = "none";


