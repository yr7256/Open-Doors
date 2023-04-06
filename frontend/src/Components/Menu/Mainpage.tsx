import React from 'react';
import '../../styles/Menu/Mainpage.css';
import { Button } from '../../styles/Button/ButtonStyle';
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
			<div className='MainpageBtns'>
				<Button className="MainpageBtnStyle" onClick={goSignupPage}>로그인 & 가입하기</Button>
				<Button className="MainpageBtnStyle" onClick={goMainPage}>가입없이 이용하기</Button>
			</div>
		</div>
	);
};

export default Mainpage;
