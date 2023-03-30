import React from 'react';
import { useNavigate } from 'react-router-dom';

function DetailReview() {
	const navigate = useNavigate();

	return (
		<>
			<p onClick={() => navigate('/editReview')}>나도 참여</p>
			<p>리뷰다</p>
		</>
	);
}

export default DetailReview;
