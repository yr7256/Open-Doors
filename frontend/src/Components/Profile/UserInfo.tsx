import React from 'react';
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
			<p>{userName}</p>
			<p>{name}</p>
		</>
	);
}
export default UserInfo;
