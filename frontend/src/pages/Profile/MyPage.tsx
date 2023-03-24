import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../../Components/Profile/UserInfo';
import Logout from '../../Components/Auth/Logout';
import MyImg from '../../Components/Profile/MyImg';
import { Head, Line } from '../../styles/Nav/NavStyle';
import { ThickLine, P, MyLine } from '../../styles/Profile/MyPagestyle';

function MyPage() {
	const navigate = useNavigate();

	const moveDonation = () => {
		navigate('/Mypage/Donation');
	};

	const moveMyInfo = () => {
		navigate('/Mypage/MyInfoManage');
	};

	const moveReview = () => {
		navigate('/MyPage/MyReview');
	};

	return (
		<>
			<Head>마이페이지</Head>
			<Line />
			<MyImg />
			<UserInfo />
			<Logout />
			<P>기부포인트 1000P</P>
			<ThickLine />
			<button onClick={moveMyInfo}>내 정보 관리</button>
			<MyLine />
			<button onClick={moveDonation}>기부 포인트 내역</button>
			<MyLine />
			<button onClick={moveReview}>리뷰 내역</button>
			<MyLine />
		</>
	);
}
export default MyPage;
