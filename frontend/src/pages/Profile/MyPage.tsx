import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoBackPage from '../../Components/Menu/goBackPage';
import UserInfo from '../../Components/Profile/UserInfo';
import MyImg from '../../Components/Profile/MyImg';
import Donation from '../../assets/img/donation.png';
import ClickReview from '../../assets/img/clickreview.png';
import MyInfoManage from '../../assets/img/myinfomanage.png';
import { Head, Line, Title } from '../../styles/Menu/NavStyle';
import { ThickLine, P, MyLine, Image, Ptag } from '../../styles/Profile/MyPagestyle';

function MyPage() {
	const navigate = useNavigate();

	const moveDonation = () => {
		navigate('/Mypage/Donation');
	};

	const moveMyInfo = () => {
		navigate('/Mypage/MyInfoManage');
	};

	const moveReview = () => {
		navigate('/Mypage/MyReview');
	};

	return (
		<>
			<Head>
				<div className="grid grid-cols-16 gap-1">
					<div className="col-start-2 col-span-2">
						<GoBackPage></GoBackPage>
					</div>
					<div className="col-start-4 col-end-8">
						<Title>마이페이지</Title>
					</div>
				</div>
			</Head>
			<Line />
			<MyImg />
			<UserInfo />
			<ThickLine />
			<div className="grid grid-cols-12 gap-1" onClick={moveMyInfo}>
				<div className="col-start-2 col-span-2">
					<Image src={MyInfoManage}></Image>
				</div>
				<div className="col-start-4 col-end-10">
					<Ptag>내 정보 관리</Ptag>
				</div>
			</div>
			<MyLine />
			<div className="grid grid-cols-12 gap-1" onClick={moveDonation}>
				<div className="col-start-2 col-span-2">
					<Image src={Donation}></Image>
				</div>
				<div className="col-start-4 col-end-12">
					<Ptag>기부포인트 내역</Ptag>
				</div>
			</div>

			<MyLine />
			<div className="grid grid-cols-12 gap-1" onClick={moveReview}>
				<div className="col-start-2  col-span-2">
					<Image src={ClickReview}></Image>
				</div>
				<div className="col-start-4 col-end-10">
					<Ptag>리뷰 내역</Ptag>
				</div>
			</div>
			<MyLine />
		</>
	);
}
export default MyPage;
