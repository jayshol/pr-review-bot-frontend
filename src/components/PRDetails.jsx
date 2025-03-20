import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatted } from "../utils/utils";
import './PRDetails.css';

export default function PRDetails() {
  const { prId, fileName } = useParams();
  const [pr, setPr] = useState(null);
  
  useEffect(() => {
    const fetchPR = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/review/${prId}/${fileName}`);
        setPr(response.data);
      } catch (error) {
        console.error("Error fetching PR details:", error);
      }
    };

    fetchPR();
  }, [prId, fileName]);

  if (!pr) return <p className="text-center">Loading PR details...</p>;
  console.log({pr});
  return (
    <div className="prContainer">
      <h2 className="prHeader">PR Details</h2>
      <div className="detailsContainer">
        <p><strong>PR ID:</strong> {pr.prId}</p>
        <p><strong>File Name:</strong> {pr.fileName}</p>
        <p><strong>Last Updated:</strong> {new Date(pr.timestamp).toLocaleString()}</p>

        <h3 className="mt-4 font-semibold">File Content:</h3>
        <pre className="codeDiv">{pr.fileContent}</pre>

        <h3 className="mt-4 font-semibold">Review Comments:</h3>
        <ul className="reviewBlock">
            {formatted(pr.reviewComments[0])}
        </ul>
      </div>
    </div>
  );
}


