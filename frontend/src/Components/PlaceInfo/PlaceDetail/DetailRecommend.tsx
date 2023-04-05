import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '../../../styles/MapDetail/DetailHomestyle';

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
	const [recommendImage, setRecommendImage] = useState<[]>([]);
	const [recommendPlace, setRecommendPlace] = useState<any[]>([]);
	const [placeName, setPlaceName] = useState('');
	const { id } = useParams();

	// 추천 누르자마자 추천 정보 10개 뜸
	useEffect(() => {
		axios
			.post(`https://j8b205.p.ssafy.io/api/recommend`, {
				spotId: id,
			})
			.then((res) => {
				setRecommendPlace(res.data);
				console.log(res.data);
				const imgArr: any = [];
				res.data.map((name: any, index: number) => {
					// console.log(name.spot.images[0].pathName);
					const place = async () => {
						const placeReqeust = await axios.get(
							`https://j8b205.p.ssafy.io/api/spot/image/${name.spot.id}/${name.spot.images[0].pathName}`
						);
						imgArr.push(placeReqeust.config.url);
						if (index === 9) {
							setRecommendImage(imgArr);
						}
					};
					place();
				});
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		axios.get(`https://j8b205.p.ssafy.io/api/spot/${id}`).then((res) => {
			setPlaceName(res.data.data.spotName);
		});
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

	console.log(recommendImage);
	return (
		<>
			{recommendPlace.map((v: { spot: SpotType; distance: number; sfIndoIds: [] }, i: number) => (
				<React.Fragment key={i}>
					<div className="grid grid-cols-12 gap-1">
						<div className="col-start-2 col-span-10">
							<h2>{v.spot.spotName} </h2>
							<p>{v.spot.spotAddress}</p>
							<p>
								{placeName}에서 {v.distance}m
							</p>
							<div className="flex flex-row">
								{v.sfIndoIds.map((sfId: number, index: number) => {
									const barrierFree = BarrierFreeList.find((bf) => bf.id === sfId);
									if (barrierFree) {
										return (
											<React.Fragment key={index}>
												<Icon src={barrierFree.image} alt={barrierFree.sfName} />
											</React.Fragment>
										);
									}
								})}
							</div>
							<img src={recommendImage[i]} alt="recommend-image" />
							<br />
						</div>
					</div>
				</React.Fragment>
			))}
			{/* {recommendImage.map((v: any, i: number) => (
				<img key={i} src={v.data}></img>
			))} */}
			<br />
			<br />
			<br />
		</>
	);
}

export default DetailRecommend;
