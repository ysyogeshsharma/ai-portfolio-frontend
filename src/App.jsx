import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Preview from './pages/Preview';
import SharedPortfolio from './pages/SharedPortfolio';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/p/:id" element={<SharedPortfolio />} />
      </Routes>
    </Router>
  );
}