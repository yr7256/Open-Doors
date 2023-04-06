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
				}
			})
			.catch((err) => {
				setReviewData([]);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderReviewImages = (images: any[]) => {
		return images.map((img, index) => {
			const imageUrl = `https://j8b205.p.ssafy.io/api/spot/image/${userName}/${img.pathName}`;
			return <ReviewImage src={imageUrl} key={index} alt="review-image" />;
		});
	};

	const renderReviews = () => {
		return reviewData.map(
			(v: { spotName: string; reviewContent: string; reviewScore: number; images: any[] }, i: number) => (
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
							<PhotoContainer>{renderReviewImages(v.images)}</PhotoContainer>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-1">
						<div className="col-start-2 col-span-10">
							<P>{v.reviewContent}</P>
						</div>
					</div>
					<Line />
				</React.Fragment>
			)
		);
	};

	return (
		<>
			<div className="grid grid-cols-12 gap-1">
				<div className="col-start-2 col-span-3">
					<h1>내 리뷰</h1>
				</div>
				<div className="col-start-5 col-span-2">{reviewData === null ? '' : <H2>{reviewData.length}</H2>}</div>
			</div>
			<ReviewArea>
				{reviewData.length === 0 ? (
					<>
						<NoReview>아직 등록하신 리뷰가 없습니다.</NoReview>
						<NoReview>어서 리뷰를 남겨주세요!</NoReview>
					</>
				) : (
					<>{renderReviews()}</>
				)}
			</ReviewArea>
			<br />
			<br />
			<br />
		</>
	);
}
export default MyReview;
