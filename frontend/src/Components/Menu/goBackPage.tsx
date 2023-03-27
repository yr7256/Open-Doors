import React from 'react';
import { useNavigate } from 'react-router-dom';

function GoBackPage() {
	const navigate = useNavigate();

	return (
		<>
			<button onClick={() => navigate(-1)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
				</svg>
			</button>
		</>
	);
}

export default GoBackPage;
