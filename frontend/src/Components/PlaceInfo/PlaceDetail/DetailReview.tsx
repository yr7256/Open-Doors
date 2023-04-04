import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import writereview from '../../../assets/img/writereview.png';
import { Img, WriteReview } from '../../../styles/MapDetail/DetailHomestyle';
import { ReviewArea, H2, Line, P, NoReview } from '../../../styles/Review/MapReviewstyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';

//barrierfree 아이콘 import
import disabledElv from '../../../assets/img/Barrierfree/disabled-elevator.png';
import elevator from '../../../assets/img/Barrierfree/elevator.png';
import family from '../../../assets/img/Barrierfree/family.png';
import firstFloor from '../../../assets/img/Barrierfree/first-floor.png';
import guideDog from '../../../assets/img/Barrierfree/guidedog.png';
import parking from '../../../assets/img/Barrierfree/parking.png';
import toilet from '../../../assets/img/Barrierfree/toilet.png';
import wheelchair from '../../../assets/img/Barrierfree/wheelchair.png';

function DetailReview() {
	const [detailData, setDetailData] = useState<[]>([]);
	const [placeImage, setPlaceImage] = useState<any>([]);
	const navigate = useNavigate();
	const { id } = useParams();

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

	useEffect(() => {
		axios
			.get(`https://j8b205.p.ssafy.io/api/review/${id}`)
			.then((response) => {
				setDetailData(response.data.data);
				// const imgArr: any[] = [];
				// response.data.data.images.map((img: any, index: any) => {
				// 	const getImage = async () => {
				// 		const requestImage = await axios.get(`https://j8b205.p.ssafy.io/api/spot/image/${id}/${img.pathName}`);
				// 		imgArr.push(requestImage.config.url);
				// 		if (index === response.data.data.images.length) {
				// 			setPlaceImage(imgArr);
				// 		}
				// 	};
				// 	getImage();
				// });
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

	// 일치하는 barrierfree만 출력
	// const mapBarrierFree = detailData.map((idx: any) => {
	// 	return idx.sfInfoIds;
	// });

	// const barrierFree = BarrierFreeList.filter((v: any) => {
	// 	return mapBarrierFree.includes(v.id);
	// });
	// console.log(barrierFree);

	// const anotherMapBarrierFree = mapBarrierFree.map((idx: any) => {
	// 	idx.map((v: any) => {
	// 		console.log(v);
	// 		return BarrierFreeList.map((k) => {
	// 			return k;
	// 		});
	// 	});
	// });
	// console.log(anotherMapBarrierFree);

	// const barrierFree = BarrierFreeList.filter((v: any) => {
	// 	return mapBarrierFree.includes(v.id);
	// });

	// const userBarrierFree =  userData.map((v: any) =>);

	return (
		<>
			<div className="grid grid-cols-12 gap-1">
				<div className="col-start-2 col-span-2">
					<h1>리뷰</h1>
				</div>
				<div className="col-start-4 col-span-2">
					<H2>{detailData.length}</H2>
				</div>
				<div className="col-start-8 col-span-1">
					<Img onClick={() => navigate('/editReview')} src={writereview}></Img>
				</div>
				<div className="col-start-9 col-span-3">
					<WriteReview onClick={() => navigate(`/map/detail/${id}/EditReview`)}>리뷰쓰기</WriteReview>
				</div>
			</div>
			<ReviewArea>
				{detailData.length === 0 ? (
					<>
						<NoReview>아직 등록된 리뷰가 없습니다.</NoReview>
						<NoReview> 여러분의 소중한 리뷰를 남겨주세요!</NoReview>
					</>
				) : (
					<>
						{detailData.map((v: { username: string; reviewContent: string; reviewScore: number }, i: number) => (
							<React.Fragment key={i}>
								<div className="grid grid-cols-12 gap-1">
									<div className="col-start-2 col-span-2">
										<h2>{v.username}</h2>
									</div>
									<div className="col-start-8 col-span-2"></div>
									<FontAwesomeIcon icon={faSolidStar} color="#6393CB" />
									<h3>{v.reviewScore}.0</h3>
								</div>
								<div className="grid grid-cols-12 gap-1">
									<div className="col-start-2 col-span-10">
										<P>{v.reviewContent}</P>
									</div>
								</div>
								<Line />
							</React.Fragment>
						))}
					</>
				)}
			</ReviewArea>
		</>
	);
}

export default DetailReview;
