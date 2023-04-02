import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import writereview from '../../../assets/img/writereview.png';
import { Img, WriteReview } from '../../../styles/MapDetail/DetailHomestyle';

function DetailReview() {
	const navigate = useNavigate();
	const { id } = useParams();
	console.log(id);

	useEffect(() => {
		axios
			.get(`http://j8b205.p.ssafy.io:8080/api/review/${id}`)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	});

	return (
		<>
			<div className="grid grid-cols-12 gap-1">
				<div className="col-start-2 col-span-2">
					<h2>리뷰</h2>
				</div>
				<div className="col-start-8 col-span-1">
					<Img onClick={() => navigate('/editReview')} src={writereview}></Img>
				</div>
				<div className="col-start-9 col-span-3">
					<WriteReview onClick={() => navigate('/editReview')}>나도 참여</WriteReview>
				</div>
			</div>
		</>
	);
}

export default DetailReview;
