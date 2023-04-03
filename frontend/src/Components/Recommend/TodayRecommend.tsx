import React from 'react';
import { useSelector } from 'react-redux';

type UserState = {
	user: {
		username: string;
		accessToken: string;
		name: string;
	};
};

function TodayRecommend() {
	const username = useSelector((state: UserState) => state.user.username);
	const name = useSelector((state: UserState) => state.user.name);
	return (
		<>
			<p>{name}을 위한 오늘의 추천!</p>
		</>
	);
}

export default TodayRecommend;
