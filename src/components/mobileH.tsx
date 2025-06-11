import React from 'react';
import '../styles/mobileH.css';

const Topbt: React.FC = () => {

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	return (
		<div className='logo' onClick={scrollToTop}></div>
	);
};

export default Topbt;
