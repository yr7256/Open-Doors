import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { PhotoContainer } from '../../styles/MapDetail/MapDetailstyle';
import { ReviewArea, H2, Line, P, NoReview, ReviewImage } from '../../styles/Review/MapReviewstyle';
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
	const [noReview, setNoReview] = useState<string>('');
	const userName = useSelector((state: UserState) => state.user.username);
	const accessToken = useSelector((state: UserState) => state.user.accessToken);

	useEffect(() => {
		axios
			.get(`https://j8b205.p.ssafy.io/api/review/get/${userName}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				if (response.data.resultCode === 400) {
					setReviewData([]);
				} else {
					setReviewData(response.data.data);
					response.data.data.map((v: any, i: number) => {
						const name = v.username;
						const imgArr: any[] = [];
						v.images.map((img: any, index: number) => {
							const getImage = async () => {
								const requestImage = await axios.get(
									`https://j8b205.p.ssafy.io/api/spot/image/${name}/${img.pathName}`
								);
								imgArr.push(requestImage.config.url);
								if (imgArr.length === v.images.length) {
									setPlaceImage(imgArr);
								}
							};
							getImage();
						});
					});
				}
			})
			.catch((err) => {
				setReviewData([]);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// console.log(reviewData);
	// console.log(placeImage);

	return (
		<>
			<div className="grid grid-cols-12 gap-1">
				<div className="col-start-2 col-span-3">
					<h1>내 리뷰</h1>
				</div>
				<div className="col-start-5 col-span-2">{reviewData === null ? '' : <H2>{reviewData.length}</H2>}</div>
			</div>
			<ReviewArea>
				{reviewData === null ? (
					<>
						<NoReview>아직 등록하신 리뷰가 없습니다.</NoReview>
						<NoReview>어서 리뷰를 남겨주세요!</NoReview>
					</>
				) : (
					<>
						{reviewData.map((v: { spotName: string; reviewContent: string; reviewScore: number }, i: number) => (
							<React.Fragment key={i}>
								<div className="grid grid-cols-12 gap-1">
									<div className="col-start-2 col-span-6">
										<h2>{v.spotName}</h2>
									</div>
									<div className="col-start-8 col-span-2"></div>
									<FontAwesomeIcon icon={faSolidStar} color="#6393CB" />
									<h3>{v.reviewScore}.0</h3>
								</div>
								<div className="grid grid-cols-12 gap-1">
									<div className="col-start-2 col-span-10">
										<PhotoContainer>
											{placeImage.map((value: string, index: number) => (
												<ReviewImage src={placeImage[index]} key={index} alt="review-image"></ReviewImage>
											))}
										</PhotoContainer>
									</div>
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
			<br />
			<br />
			<br />
		</>
	);
}
export default MyReview;
