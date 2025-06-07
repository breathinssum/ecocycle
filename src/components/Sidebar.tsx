import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar: React.FC = () => {

  return (
    <div className="sidebar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
        <div className='EcoImg'></div>News
      </NavLink>

      <NavLink to="/practice"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        <div className='PraImg'></div>Practice
      </NavLink>
    </div>
  );
};

export default Sidebar;
