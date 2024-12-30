import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import SwapInterface from './components/SwapInterface';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0D0E12]">
        <Navigation />
        <SwapInterface />
      </div>
    </Router>
  );
}

export default App;

