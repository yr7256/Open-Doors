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

	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const handleLogout = () => {
		dispatch(logoutAccount());
		logout();
		navigate('/Login');
		window.localStorage.clear();
	};
	return (
		<>
			<button onClick={handleLogout}>로그아웃</button>
		</>
	);
}

export default Logout;
