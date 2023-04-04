import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DonationFormOuterDiv, InputBox, Button, DonationButton } from '../../styles/Donation/DonationStyled';
import axios from 'axios';

type UserState = {
	user: {
		username: string;
		accessToken: string;
		name: string;
	};
};

interface ApiResponse {
	resultCode: string;
	message: string;
	data: number;
}

function DonationForm() {
	const userName = useSelector((state: UserState) => state.user.username);
	const name = useSelector((state: UserState) => state.user.name);

	const donationThisMonth = 12000;
	const totalDonation = 150000;

	const [donationPoint, setDonationPoint] = useState(0);
	const [currentPoint, setCurrentPoint] = useState(500);
	const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
	// useEffect() fetch donation info

	const handleUseAllPoint = () => {
		setDonationPoint(currentPoint);
	};

	// 제출하는 axios함수 필요.
	const handleDonate = () => {
		setIsButtonClicked(true);
		handleSubmit();
		setTimeout(() => {
			setIsButtonClicked(false);
		}, 1000);
	};
	// http://localhost:8000/api/user/point/{userName};

	const handleSubmit = () => {
		if (donationPoint <= currentPoint) {
			axios
				.post<ApiResponse>('http://url/api/donation', { donationPoint }) // 😀 요청 수정 필요함.
				.then((response) => {
					const { data } = response.data;
					setCurrentPoint(currentPoint - donationPoint);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			alert('기부 포인트는 현재 보유한 포인트 이하로 설정해주세요.');
		}
	};

	// const;
	useEffect(() => {
		console.log(userName);
		if (userName) {
			axios
				.get<ApiResponse>(`http://localhost:8000/api/user/point/${userName}`)
				.then((response) => {
					const { data } = response.data;
					setCurrentPoint(data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [userName]);

	return (
		<DonationFormOuterDiv>
			<div className="flexCol">
				<div className="yellowDiv">
					<div className="flexRowCenter">
						<img src="" alt="손그림"></img>
						<div className="flexEndLetters">
							<em className="fundraiserTitle textRight">open doors 모금함</em>
							{/* <br /> */}
							<span className="textRight">이번달 모금액: {donationThisMonth.toLocaleString()}P</span>
							{/* <br /> */}
							<span>총 모금액: {totalDonation.toLocaleString()}P</span>
						</div>
					</div>
				</div>
				<div className="blueDiv verticalSpace">
					<div className="flexRow">
						<span>현재 {name}님의 </span>

						<em>보유 포인트: {currentPoint.toLocaleString()}P</em>
					</div>
				</div>
				<div className="yellowDiv verticalSpace">
					<div className="flexCol">
						<div className="flexRow">
							기부할 포인트:{' '}
							<InputBox
								value={donationPoint}
								onChange={(e) => setDonationPoint(e.target.value === '' ? 0 : parseInt(e.target.value))}
							></InputBox>
							P
						</div>
						<Button onClick={handleUseAllPoint}>전액사용</Button>
					</div>
				</div>
				<div>
					<DonationButton
						onClick={handleDonate}
						style={{
							backgroundColor: isButtonClicked ? '#3b82f6' : '#fff',
							color: isButtonClicked ? '#fff' : '#3b82f6',
						}}
					>
						지금 기부하기
					</DonationButton>
					<div className="smallDesc">기부된 포인트는 취소할 수 없습니다.</div>
				</div>
			</div>
		</DonationFormOuterDiv>
	);
}

export default DonationForm;
