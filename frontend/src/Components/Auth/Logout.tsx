import React from 'react';
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
		window.localStorage.clear();
	};
	return (
		<>
			<button onClick={handleLogout}>로그아웃</button>
		</>
	);
}

export default Logout;
