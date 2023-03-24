import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/Cookie';
import { logoutAccount } from '../../store/AuthSlice';

function Logout() {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutAccount());
		logout();

		const logoutGet = () => {
			axios.get('').then((res) => console.log(res.data));
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
