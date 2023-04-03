import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/Cookie';
import { logoutAccount } from '../../store/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

type UserState = {
	user: {
		username: string;
		accessToken: string;
	};
};

function Logout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const accessToken = useSelector((state: UserState) => state.user.accessToken);

	const handleLogout = () => {
		dispatch(logoutAccount());
		logout();
		navigate('/Login');

		const logoutGet = () => {
			axios
				.get('https://j8b205.p.ssafy.io/api/users/logout', {
					headers: { Authorization: `Bearer ${accessToken}` },
				})
				.then((res) => console.log(res.data));
		};
		logoutGet();
	};
	return (
		<>
			<button onClick={handleLogout}>로그아웃</button>
		</>
	);
}

export default Logout;
