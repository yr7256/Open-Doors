import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Line, Name } from '../../styles/Recommend/Recommendstyle';

type UserState = {
	user: {
		username: string;
		name: string;
		accessToken: string;
	};
};

function TodayRecommend() {
	const [recommendData, setRecommendData] = useState<[]>([]);
	const username = useSelector((state: UserState) => state.user.username);
	const name = useSelector((state: UserState) => state.user.name);
	const accessToken = useSelector((state: UserState) => state.user.accessToken);

	// useEffect(() => {
	// 	axios
	// 		.get('', {
	// 			headers: {
	// 				Authorization: `Bearer ${accessToken}`,
	// 			},
	// 		})
	// 		.then((res) => {
	// 			console.log(res);
	// 			setRecommendData(res.data);
	// 		})
	// 		.catch((err) => console.log(err));
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

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
		</>
	);
}

export default TodayRecommend;
