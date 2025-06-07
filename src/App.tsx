import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/header';
import Eco from './pages/eco';
import Practice from './pages/practice';

const App: React.FC = () => {
  return (
    <Router>
      <div className="layout">
        <div className='LeftBox'>
        <Header />
        <Sidebar />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Eco />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

