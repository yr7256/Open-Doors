import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dummy from '../../../csvjson.json';
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

	const spotPlace = dummy.filter((spot) => spot.spotSeq === id);
	console.log(spotPlace[0].spotName, spotPlace[0].spotLat, spotPlace[0].spotLng);

	// 추천 누르자마자 추천 정보 10개 뜸
	useEffect(() => {
		axios
			.post('http://172.20.10.2:8080/api/recommend', {
				spotId: 4,
			})
			.then((res) => {
				res.data.map((name: any) =>
					axios
						.get(`http://172.20.10.2:8080/api/spot/${name[0]}`)
						.then((response) => setRecommendPlace(response.data))
						.catch((err) => console.log(err))
				);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<p>추천이다</p>
			<p>{recommendPlace}</p>
		</>
	);
}

export default DetailRecommend;
