import React from 'react';
import UserInfo from '../../Components/Profile/UserInfo';
import Logout from '../../Components/Auth/Logout';

function MyPage() {
	return (
		<div>
			<UserInfo />
			<Logout />
		</div>
	);
}
export default MyPage;
