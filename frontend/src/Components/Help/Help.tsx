import React from 'react';
import { Head, Line } from '../../styles/Kakao/SearchAddress';
import { useNavigate } from "react-router-dom";

const Help = () => {
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
				<h1>문의하기</h1>
			</Head>
			<Line />
			준비중입니다!
		</>
	);
};

export default Help;
