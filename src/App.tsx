import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/header';
import Eco from './pages/eco';
import Practice from './pages/practice';
import Hamberger from './components/hamberger';
import Topbt from './components/mobileH';
import Search from './pages/search';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="layout">
        <div className="LeftBox">
          {isMobile ? (
            <>
              <Hamberger />
              <Topbt />
            </>
          ) : (
            <>
              <Header />
              <Sidebar />
            </>
          )}
        </div>


        <div className="content">
          <Routes>
            <Route path="/" element={<Eco />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
