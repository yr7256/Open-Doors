import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

//barrierfree 아이콘 import
import disabledElv from '../../../assets/img/Barrierfree/disabled-elevator.png';
import elevator from '../../../assets/img/Barrierfree/elevator.png';
import family from '../../../assets/img/Barrierfree/family.png';
import firstFloor from '../../../assets/img/Barrierfree/first-floor.png';
import guideDog from '../../../assets/img/Barrierfree/guidedog.png';
import parking from '../../../assets/img/Barrierfree/parking.png';
import toilet from '../../../assets/img/Barrierfree/toilet.png';
import wheelchair from '../../../assets/img/Barrierfree/wheelchair.png';

interface SpotType {
	spotName: string;
	spotAddress: string;
}

function DetailRecommend() {
	const [recommendPlace, setRecommendPlace] = useState<any[]>([]);
	const { id } = useParams();

	// 추천 누르자마자 추천 정보 10개 뜸
	useEffect(() => {
		axios
			.post(`https://j8b205.p.ssafy.io/api/recommend`, {
				spotId: id,
			})
			.then((res) => {
				const placeArr: any = [];
				res.data.map((name: string, index: number) => {
					placeArr.push(name);
					setRecommendPlace(placeArr);
					// const place = async () => {
					// 	const placeReqeust = await axios.get(`https://j8b205.p.ssafy.io/api/spot/${name[0]}`);
					// 	placeArr.push(placeReqeust.data.data);
					// 	if (index === res.data.data.length - 1) {
					// 		setRecommendPlace(placeArr);
					// 	}
					// };
					// place();
				});
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(recommendPlace);

	const spotInfo = recommendPlace.map((v: any) => {
		return v;
	});

	// barrierfree 종류
	const BarrierFreeList = [
		{ id: 1, sfName: '휠체어 접근 가능', image: wheelchair },
		{ id: 2, sfName: '해당 장소가 1층에 위치함', image: firstFloor },
		{ id: 3, sfName: '장애인 화장실 있음', image: toilet },
		{ id: 4, sfName: '애완견/도우미견 출입가능', image: guideDog },
		{ id: 5, sfName: '장애인 엘리베이터 있음', image: disabledElv },
		{ id: 6, sfName: '엘리베이터 있음', image: elevator },
		{ id: 7, sfName: '건물 내 무료주차 가능', image: parking },
		{ id: 8, sfName: '가족/어린이 이용에 적합', image: family },
	];

	return (
		<>
			{spotInfo.map((v: { spot: SpotType; distance: number }, i: number) => (
				<React.Fragment key={i}>
					<div className="grid grid-cols-12 gap-1">
						<div className="col-start-2 col-span-10">
							<h2>{v.spot.spotName} </h2>
							<h2>{v.spot.spotAddress}</h2>
							<h2>{v.distance}m</h2>
							<br />
						</div>
					</div>
				</React.Fragment>
			))}
		</>
	);
}

export default DetailRecommend;
