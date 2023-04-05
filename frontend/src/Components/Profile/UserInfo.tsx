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

	return (
		<>
			<CenterP>
				{name}
				<p>기부포인트</p>
			</CenterP>
		</>
	);
}
export default UserInfo;
