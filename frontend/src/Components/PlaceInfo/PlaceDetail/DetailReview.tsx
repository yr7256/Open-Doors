import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import writereview from '../../../assets/img/writereview.png';
import { Img, WriteReview } from '../../../styles/MapDetail/DetailHomestyle';

function DetailReview() {
	const [detailData, setDetailData] = useState<[]>([]);
	const navigate = useNavigate();
	const { id } = useParams();
	console.log(id);

	useEffect(() => {
		axios
			.get(`http://192.168.31.134:8080/api/review/${id}`)
			.then((response) => {
				console.log(response.data);
				setDetailData(response.data.data);
				response.data.data.map((reviewid: any) => {
					console.log(reviewid);
				});
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(detailData);

	// useEffect(() => {
	// 	axios
	// 		.get(`http://j8b205.p.ssafy.io:8080/api/review/${id}`)
	// 		.then((res) => console.log(res))
	// 		.catch((err) => console.log(err));
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

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
					<WriteReview onClick={() => navigate(`/map/detail/${id}/EditReview`)}>나도 참여</WriteReview>
				</div>
			</div>
		</>
	);
}

export default DetailReview;
