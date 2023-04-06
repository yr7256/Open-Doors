import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
	Line,
	Name,
	Span,
	Div,
	Today,
	SpotName,
	Distance,
	Ptag,
	Square,
	Reason,
	RecommendImage,
	Icon,
} from '../../styles/Recommend/Recommendstyle';
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
	const [recommendImage, setRecommendImage] = useState<[]>([]);
	const [goodState, setGoodState] = useState<boolean>(false);
	const [badState, setBadState] = useState<boolean>(false);
	const name = useSelector((state: UserState) => state.user.name);
	const accessToken = useSelector((state: UserState) => state.user.accessToken);
	const username = useSelector((state: UserState) => state.user.username);

	// console.log(props.getChild);

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

	// 이미지 불러오기

	useEffect(() => {
		const imgArr: any = [];
		props.getChild.map((v: any, i: number) => {
			const imageRequest = async () => {
				const getImg = await axios.get(
					`https://j8b205.p.ssafy.io/api/spot/image/${v.spot.id}/${v.spot.images[0].pathName}`
				);
				imgArr.push(getImg.config.url);
				if (i === 9) {
					setRecommendImage(imgArr);
				}
			};
			imageRequest();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// console.log(recommendImage);

	return (
		<>
			<div className="grid grid-cols-12 gap-1">
				<div className="col-start-2 col-span-11">
					<Div>
						<Name>{name}</Name>
						<Span>님을 위한</Span>
						<Today>오늘의 추천!</Today>
					</Div>
				</div>
			</div>
			<Line />
			<br />

			{props.getChild.map((v: { distance: number; reason: string; spot: any; sfInfoIds: [] }, i: number) => (
				<div className="grid grid-cols-16 gap-1" key={i}>
					<div className="col-start-2 col-span-12">
						<SpotName>{v.spot.spotName}</SpotName>
						<Ptag>{v.spot.spotAddress}</Ptag>
						<Ptag>
							현재위치에서 <Distance>{v.distance}m</Distance>
						</Ptag>
					</div>
					<RecommendImage src={recommendImage[i]} alt="recommend-image" />
					<div className="col-start-2 col-span-12">
						<div className="flex flex-row">
							{v.sfInfoIds.map((sfId: number, index: number) => {
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
					</div>
					<div className="col-start-2 col-span-2">
						<Square>
							<p>추천</p>
						</Square>
					</div>
					<div className="col-start-4 col-span-7">
						<Reason>{v.reason}</Reason>
					</div>
					<div className="col-start-11 col-span-4">
						<FontAwesomeIcon
							style={{ marginRight: '12px', fontSize: '32px' }}
							icon={recommendGoodArr[i] ? faSolidThumbsUp : faRegularThumbsUp}
							onClick={() => {
								const changeArr = recommendGoodArr.slice();
								changeArr[i] = !changeArr[i];
								setRecommendGoodArr(changeArr);
								// 여기서 axios 하기
								if (recommendGoodArr[i] === false) {
									axios({
										url: 'https://j8b205.p.ssafy.io/api/user/like',
										method: 'post',
										data: {
											username: username,
											SpotId: v.spot.id,
											isLikeOrDisLike: 1,
										},
									});
								}
							}}
						/>
						<FontAwesomeIcon
							style={{ fontSize: '32px' }}
							icon={recommendBadArr[i] ? faSolidThumbsDown : faRegularThumbsDown}
							onClick={() => {
								const changeArr = recommendBadArr.slice();
								changeArr[i] = !changeArr[i];
								setRecommendBadArr(changeArr);
								if (recommendBadArr[i] === false) {
									axios({
										url: 'https://j8b205.p.ssafy.io/api/user/like',
										method: 'post',
										data: {
											username: username,
											SpotId: v.spot.id,
											isLikeOrDisLike: 0,
										},
									});
								}
							}}
							rotation={90}
						/>
					</div>
					<br />
				</div>
			))}
		</>
	);
}

export default TodayRecommend;
