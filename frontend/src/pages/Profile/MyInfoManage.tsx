import React from 'react';
import { Head, Line, Title } from '../../styles/Menu/NavStyle';
import { ThickLine, Ptag, Div } from '../../styles/Profile/MyPagestyle';
import GoBackPage from '../../Components/Menu/goBackPage';
import MyImg from '../../Components/Profile/MyImg';
import Footer from '../../Components/Menu/Footer';
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
			<Head>
				<div className="grid grid-cols-16 gap-1">
					<div className="col-start-2 col-span-2">
						<GoBackPage></GoBackPage>
					</div>
					<div className="col-start-4 col-end-8">
						<Title>내 정보 관리</Title>
					</div>
				</div>
			</Head>
			<Line />
			<MyImg />
			<ThickLine />
			<Div onClick={moveChangePassword}>
				<Ptag>비밀번호 변경</Ptag>
			</Div>
			<Line />
			<Div onClick={moveChangeBarrierFree}>
				<Ptag>배리어프리 항목 변경</Ptag>
			</Div>
			<Line />
			<Footer />
		</>
	);
}

export default MyInfoManage;
