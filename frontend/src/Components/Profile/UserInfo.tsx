import React from 'react';
import { CenterP } from '../../styles/Profile/MyPagestyle';
import { useSelector } from 'react-redux';

type UserState = {
	user: {
		username: string;
		password: string;
		name: string;
	};
};

function UserInfo() {
	const userName = useSelector((state: UserState) => state.user.username);
	const name = useSelector((state: UserState) => state.user.name);
	console.log(userName, name);

	return (
		<>
			<CenterP>{name}</CenterP>
			<p>기부포인트</p>
		</>
	);
}
export default UserInfo;
