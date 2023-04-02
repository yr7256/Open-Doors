import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// type Spot = {
// 	spotSeq: string;
// 	spotName: string;
// 	spotLat: number;
// 	spotLng: number;
// };

function DetailRecommend() {
	const [recommendPlace, setRecommendPlace] = useState<any[]>([]);
	const { id } = useParams();

	// 추천 누르자마자 추천 정보 10개 뜸
	useEffect(() => {
		axios
			.post(`http://j8b205.p.ssafy.io:8080/api/recommend`, {
				spotId: id,
			})
			.then((res) => {
				console.log(res);
				res.data.map((name: any) =>
					axios
						.get(`http://192.168.31.134:8080//api/spot/${name[0]}`)
						.then((response) => setRecommendPlace(response.data))
						.catch((err) => console.log(err))
				);
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<p>추천이다</p>
			<p>{recommendPlace}</p>
		</>
	);
}

export default DetailRecommend;
