import React from 'react';
import '../../styles/Menu/Mainpage.css';
import { MainButton } from '../../styles/Button/ButtonStyle';
import { useNavigate } from 'react-router-dom';

const Mainpage = () => {
	const navigate = useNavigate();
	const goMainPage = () => {
		navigate('/map');
	};
	const goSignupPage = () => {
		navigate('/Login');
	};
	return (
		<div className="background-image">
			<div className="MainpageBtns">
				<MainButton className="MainpageBtnStyle" onClick={goSignupPage}>
					로그인 & 가입하기
				</MainButton>
				<MainButton className="MainpageBtnStyle" onClick={goMainPage}>
					가입없이 이용하기
				</MainButton>
			</div>
		</div>
	);
};

export default Mainpage;
