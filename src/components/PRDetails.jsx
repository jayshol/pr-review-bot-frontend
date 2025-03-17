import React from 'react';

const PRDetails = ({ pr }) => (
  <div>
    <h2>{pr.title}</h2>
    <p>{pr.description}</p>
    {/* Render file changes and comments here */}
  </div>
);

export default PRDetails;
