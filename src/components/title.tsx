import React from 'react';
import '../styles/title.css';

interface TitleProps {
	title: string; // 제목을 props로 받을 거야
}

const Title: React.FC<TitleProps> = ({ title }) => {
	return (
		<div className="Title">
			Title &gt; {title}
		</div>
	);
};

export default Title;
