import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
			.get(`https://j8b205.p.ssafy.io/api/review/${userName}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				console.log(response);
				setReviewData(response.data);
				response.data.data.map((reviewid: any) => {
					console.log(reviewid);
				});
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(reviewData);
	return (
		<>
			<h4>내 리뷰</h4>
		</>
	);
}
export default MyReview;
