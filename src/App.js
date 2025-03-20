import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PRDetails from './components/PRDetails';
import CodeReview from './components/CodeReview';
import Home from './components/HomePage';
import './App.css';

const App = () => (
  <Router>
    <nav className='nav'>
      <ul className='navList'>
        <li className='navItem'>
          <Link to="/" className='navLink'>Home</Link>
        </li>
        <li className='navItem'>
          <Link to="/dashboard" className='navLink'>Dashboard</Link>
        </li>
        <li className='navItem'>
          <Link to="/prDetails/:prId/:fileName" className='navLink'>PRDetails</Link>
        </li>
        <li className='navItem'>
          <Link to="/codereview" className='navLink'>CodeReview</Link>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/prDetails/:prId/:fileName" element={<PRDetails />} />
      <Route path="/codereview" element={<CodeReview />} />
    </Routes>
  </Router>
);


export default App;
