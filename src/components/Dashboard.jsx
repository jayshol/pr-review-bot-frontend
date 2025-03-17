import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [prs, setPrs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/prs')
      .then(response => setPrs(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Pull Requests</h1>
      <ul>
        {prs.map(pr => (
          <li key={pr.id}>{pr.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
