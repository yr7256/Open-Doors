import React, { useState } from 'react';
import { Head, Line, Title } from '../../styles/Menu/NavStyle';
import { ThickLine, Ptag, Div, Withdraw, Gray } from '../../styles/Profile/MyPagestyle';
import Withdrawal from '../../Components/Auth/Withdrawal';
import GoBackPage from '../../Components/Menu/goBackPage';
import MyImgEdit from '../../Components/Profile/MyImgEdit';
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

	const [isOpenModal, setIsOpenModal] = useState(false);
	const clickModal = () => {
		setIsOpenModal(true);
	};
	const closeModal = () => {
		setIsOpenModal(false);
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
			<MyImgEdit />
			<ThickLine />
			<Div onClick={moveChangePassword}>
				<Ptag>비밀번호 변경</Ptag>
			</Div>
			<Line />
			<Div onClick={moveChangeBarrierFree}>
				<Ptag>배리어프리 항목 변경</Ptag>
			</Div>
			<Line />
			<Withdraw>
				<Gray onClick={clickModal}>회원탈퇴</Gray>
				{isOpenModal && (
					<Withdrawal
						closeModal={closeModal}
						title="정말 탈퇴하시겠습니까?"
						alert="탈퇴 시 모든 정보가 삭제되며, 복구되지 않습니다."
					/>
				)}
			</Withdraw>
			<Footer />
		</>
	);
}

export default MyInfoManage;
