import React from 'react';
import { useSelector } from 'react-redux';

type UserState = {
	user: {
		username: string;
	};
};

function showRecommend() {
	const userName = useSelector((state: UserState) => state.user.username);
	return (
		<>
			<p>{userName}을 위한 오늘의 추천</p>
		</>
	);
}

export default showRecommend;
