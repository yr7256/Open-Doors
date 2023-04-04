import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ReviewArea, H2, Line, P } from '../../styles/Review/MapReviewstyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';

type UserState = {
	user: {
		username: string;
		accessToken: string;
	};
};

function MyReview() {
	const [reviewData, setReviewData] = useState<[]>([]);
	const [placeImage, setPlaceImage] = useState<any>([]);
	const userName = useSelector((state: UserState) => state.user.username);
	const accessToken = useSelector((state: UserState) => state.user.accessToken);

	// https://j8b205.p.ssafy.io

	useEffect(() => {
		axios
			.get(`https://j8b205.p.ssafy.io/api/review/get/${userName}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				console.log(response);
				setReviewData(response.data.data);
				// const imgArr: any[] = [];
				// response.data.data.images.map((img: any, index: any) => {
				// 	const getImage = async () => {
				// 		const requestImage = await axios.get(`https://j8b205.p.ssafy.io/api/spot/image/${id}/${img.pathName}`);
				// 		imgArr.push(requestImage.config.url);
				// 		if (index === response.data.data.image.length) {
				// 			setPlaceImage(imgArr);
				// 		}
				// 	};
				// });
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(reviewData);
	return (
		<>
			<div className="grid grid-cols-12 gap-1">
				<div className="col-start-2 col-span-3">
					<h1>내 리뷰</h1>
				</div>
				<div className="col-start-5 col-span-2">
					<H2>{reviewData.length}</H2>
				</div>
			</div>
			<ReviewArea>
				{reviewData.length === 0 ? (
					<>
						<p>아직 등록하신 리뷰가 없습니다.</p>
						<p>어서 리뷰를 남겨주세요!</p>
					</>
				) : (
					<>
						{reviewData.map((v: { username: string; reviewContent: string; reviewScore: number }, i: number) => (
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
export default MyReview;
