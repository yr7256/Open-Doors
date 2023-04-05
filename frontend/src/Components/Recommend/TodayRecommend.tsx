import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Line, Name } from '../../styles/Recommend/Recommendstyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as faRegularThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faSolidThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as faRegularThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown as faSolidThumbsDown } from '@fortawesome/free-solid-svg-icons';

//barrierfree 아이콘 import
import disabledElv from '../../assets/img/Barrierfree/disabled-elevator.png';
import elevator from '../../assets/img/Barrierfree/elevator.png';
import family from '../../assets/img/Barrierfree/family.png';
import firstFloor from '../../assets/img/Barrierfree/first-floor.png';
import guideDog from '../../assets/img/Barrierfree/guidedog.png';
import parking from '../../assets/img/Barrierfree/parking.png';
import toilet from '../../assets/img/Barrierfree/toilet.png';
import wheelchair from '../../assets/img/Barrierfree/wheelchair.png';

type UserState = {
	user: {
		username: string;
		name: string;
		accessToken: string;
	};
};

function TodayRecommend(props: any) {
	const [goodState, setGoodState] = useState<boolean>(false);
	const [badState, setBadState] = useState<boolean>(false);
	const name = useSelector((state: UserState) => state.user.name);
	const accessToken = useSelector((state: UserState) => state.user.accessToken);

	console.log(props.getChild);

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
	const [recommendGoodArr, setRecommendGoodArr] = useState<any>([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);
	const [recommendBadArr, setRecommendBadArr] = useState<any>([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);

	// const handleLike = (e: any) => {};

	// const mapBarrierFree = props.getChild.map((v: any, idx: number) => {
	// 	return v.spot.spotSfInfos;
	// });
	// console.log(mapBarrierFree);

	// const barrierFree = props.getChild.map(
	// 	(v: { distance: number; reason: string; spot: any; spotSfInfos: [] }, i: any) => {
	// 		return v.spot.spotSfInfos;
	// 	}
	// );

	// console.log(barrierFree);

	// const barrierFree = BarrierFreeList.filter((v: any) => {
	// 	return mapBarrierFree.includes(v.id);
	// });
	// console.log(barrierFree);

	// const barrierFreeImages = barrierFree.map((v: any) => v.image);

	// 이미지 불러오기
	// useEffect(() => {
	// 	{props.getChild.map((v: {images: string}, i: number) => (

	// 	))}
	// 	axios.get(``);
	// });

	return (
		<>
			<div className="grid grid-cols-12 gap-0">
				<div className="col-start-2 col-span-3">
					<Name>{name}</Name>
				</div>
				<div className="col-start-5 col-span-3">
					<h4>님을 위한</h4>
				</div>
				<div className="col-start-8 col-span-4">
					<h2>오늘의 추천!</h2>
				</div>
			</div>
			<Line />
			{props.getChild.map((v: { distance: number; reason: string; spot: any }, i: number) => (
				<React.Fragment key={i}>
					<p>{v.distance}</p>
					<p>{v.spot.spotName}</p>
					<p>{v.spot.spotAddress}</p>
					<div>
						<p>추천</p>
						<p>{v.reason}</p>
						<FontAwesomeIcon
							icon={recommendGoodArr[i] ? faSolidThumbsUp : faRegularThumbsUp}
							onClick={() => {
								const changeArr = recommendGoodArr.slice();
								changeArr[i] = !changeArr[i];
								setRecommendGoodArr(changeArr);
								// 여기서 axios 하기
								// axios.get('').then().catch();
							}}
						/>
						<FontAwesomeIcon
							icon={recommendBadArr[i] ? faSolidThumbsDown : faRegularThumbsDown}
							onClick={() => {
								const changeArr = recommendBadArr.slice();
								changeArr[i] = !changeArr[i];
								setRecommendBadArr(changeArr);
							}}
							rotation={90}
						/>
					</div>
					<br />
				</React.Fragment>
			))}
		</>
	);
}

export default TodayRecommend;
