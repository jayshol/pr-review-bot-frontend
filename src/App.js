import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PRDetails from './components/PRDetails';
import CodeReview from './components/CodeReview';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/pr/:id" element={<PRDetails />} />
      <Route path="/codereview" element={<CodeReview />} />
    </Routes>
  </Router>
);

export default App;
