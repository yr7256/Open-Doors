import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/Cookie';
import { logoutAccount } from '../../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

function Logout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logoutAccount());
		logout();
		navigate('/Login');

		const logoutGet = () => {
			const accessToken = localStorage.getItem('accessToken');
			axios
				.get('http://j8b205.p.ssafy.io:8080/api/users/logout', {
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
