import React from 'react';
import { Head, Line } from '../../styles/Kakao/SearchAddress';
import { useNavigate } from 'react-router-dom';

const Donation = () => {
	const navigate = useNavigate();
	return (
		<>
			<Head>
				<h1
					className="back"
					onClick={() => {
						navigate('/map');
					}}
				>
					&lt;
				</h1>
				<h1>기부하기</h1>
			</Head>
			<Line />
		</>
	);
};

export default Donation;