import React from 'react';
import { CenterP } from '../../styles/Profile/MyPagestyle';
import { useSelector } from 'react-redux';

type UserState = {
	user: {
		username: string;
		name: string;
	};
};

function UserInfo() {
	const userName = useSelector((state: UserState) => state.user.username);
	const name = useSelector((state: UserState) => state.user.name);

	return (
		<>
			<CenterP>{userName}</CenterP>
			<CenterP>{name}</CenterP>
		</>
	);
}
export default UserInfo;
