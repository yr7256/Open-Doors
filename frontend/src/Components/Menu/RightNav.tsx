import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import basicimg from '../../assets/img/basicimg.png';
import { logout } from '../../store/Cookie';
import { logoutAccount } from '../../store/AuthSlice';
import '../../styles/Menu/RightNav.css';
import { Ul, Li, Image, MenuImg, Line, H4 } from '../../styles/Menu/styles';

//사용한 이미지
import mylocation from '../../assets/img/recomendation.png';
import registermap from '../../assets/img/myinfomanage.png';
import donation from '../../assets/img/donation.png';
import logoutImg from '../../assets/img/logout.png';
import loginImg from '../../assets/img/loginImg.png';
import signUp from '../../assets/img/signup.png';

type Props = {
	open: boolean;
};

type UserState = {
	user: {
		userImg: string;
		name: string;
	};
};

function RightNav(props: Props) {
	const [myImage, setMyImage] = useState(`${basicimg}`);
	const name = useSelector((state: UserState) => state.user.name);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const LogoutHandler = () => {
		dispatch(logoutAccount());
		logout();
		navigate('/map');
		window.localStorage.clear();
	};
	const LoginHandler = () => {
		navigate('/Login');
	};
	const accessToken = localStorage.getItem('accessToken');

	return (
		<>
			<Ul open={props.open}>
				{accessToken ? (
					<MenuImg>
						<Image src={myImage} alt="my-image" onClick={() => navigate('/Mypage')} />
						<h2>{name}</h2>
					</MenuImg>
				) : (
					<>
						<MenuImg>
							<Image src={signUp} alt="sign-up" onClick={() => navigate('/Login')} />
							<H4>아직 가입을 안하셨나요?</H4>
							<h2 onClick={() => navigate('/Signup')}>가입 하러가기</h2>
						</MenuImg>
					</>
				)}

				<NavLink
					to="/myloc"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li className="flex items-center">
						<img className="menubarIcon" src={mylocation} alt="myloc" />
						내가 등록한 장소
					</Li>
				</NavLink>
				<NavLink
					to="/map/newlocation"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li className="flex items-center">
						<img className="menubarIcon" src={registermap} alt="regimap" />
						장소 등록하기
					</Li>
				</NavLink>
				<NavLink
					to="/donation"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li className="flex items-center">
						<img className="menubarIcon" src={donation} alt="donation" />
						기부하기
					</Li>
				</NavLink>
				<div className="loginout">
					<Line />
					{accessToken ? (
						<Li onClick={LogoutHandler} className="flex items-center">
							<img className="menubarIcon" src={logoutImg} alt="logout" />
							로그아웃
						</Li>
					) : (
						<Li onClick={LoginHandler} className="flex items-center">
							<img className="menubarIcon" src={loginImg} alt="login" />
							로그인
						</Li>
					)}
				</div>
			</Ul>

			{/* <Routes>
				<Route path="/myloc" />
				<Route path="/map/newlocation" />
				<Route path="/donation" />
				<Route path="/help" />
			</Routes> */}
		</>
	);
}

export default RightNav;
