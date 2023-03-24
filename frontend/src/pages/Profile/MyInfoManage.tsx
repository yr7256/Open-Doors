import React from 'react';
import { Head, Line } from '../../styles/Nav/NavStyle';
import { ThickLine } from '../../styles/Profile/MyPagestyle';
import MyImg from '../../Components/Profile/MyImg';
import { useNavigate } from 'react-router-dom';

function MyInfoManage() {
	const navigate = useNavigate();

	const moveChangePassword = () => {
		navigate('/Mypage/ChangePassword');
	};

	const moveChangeBarrierFree = () => {
		navigate('/Mypage/ChangeBarrierFree');
	};
	return (
		<>
			<Head>내 정보 관리</Head>
			<Line />
			<MyImg />
			<ThickLine />
			<h1 onClick={moveChangePassword}>비밀번호 변경</h1>
			<Line />
			<h1 onClick={moveChangeBarrierFree}>배리어프리 항목 변경</h1>
		</>
	);
}

export default MyInfoManage;
