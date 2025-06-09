import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/hamberger.css';

const Hamberger: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(prev => !prev);
	};

	return (
		<div className="hamburger-wrapper">
			<div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
				<span></span>
				<span></span>
				<span></span>
			</div>

			{isOpen && (
				<nav className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
					<ul>
						<li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
							<div className='EcoImg'></div>News
						</NavLink></li>
						<li><NavLink to="/practice"
							className={({ isActive }) => isActive ? 'active' : ''}
						>
							<div className='PraImg'></div>Practice
						</NavLink></li>
					</ul>
				</nav>
			)}
		</div>
	);
};

export default Hamberger;
