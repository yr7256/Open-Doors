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
	console.log(accessToken);

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

		// const logoutGet = () => {
		// 	axios
		// 		.get('https://j8b205.p.ssafy.io/api/users/logout', config)
		// 		.then((res) => {
		// 			console.log(res);
		// 			navigate('/Login');
		// 		})
		// 		.catch((err) => {
		// 			console.log(err);
		// 			alert('로그아웃에 실패하셨습니다.');
		// 		});
		// };
		// logoutGet();
	};
	return (
		<>
			<button onClick={handleLogout}>로그아웃</button>
		</>
	);
}

export default Logout;
