import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DonationFormOuterDiv, InputBox, Button, DonationButton } from '../../styles/Donation/DonationStyled';
import axios, { AxiosError } from 'axios';

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

interface MyPointResponse {
	totalPoint: number;
}

interface FundraiserInfoResponse {
	donationAmountOnMonth: number;
	totalDonationAmount: number;
}

interface FundraiserInfoErrorResponse {
	data: {
		code: number;
		message: string;
		'error type': string;
	};
}

function DonationForm() {
	const userName = useSelector((state: UserState) => state.user.username);
	const name = useSelector((state: UserState) => state.user.name);

	const [totalDonation, setTotalDonation] = useState(0);
	const [donationThisMonth, setDdonationThisMonth] = useState(0);

	const [donationPoint, setDonationPoint] = useState(0);
	const [currentPoint, setCurrentPoint] = useState(0);
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
		}, 500);
	};

	const handleSubmit = () => {
		if (donationPoint <= currentPoint) {
			const accessToken = localStorage.getItem('accessToken');
			const headers = {
				'Content-type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			};
			const data = { donationAmount: donationPoint };
			axios
				.put<FundraiserInfoResponse>('https://j8b205.p.ssafy.io/api/donation', data, { headers }) // 😀 요청 수정 필요함.
				.then((response) => {
					// const { data } = response.data;
					setCurrentPoint(currentPoint - donationPoint);
				})
				.catch((error: AxiosError<FundraiserInfoErrorResponse>) => {
					console.log(error.response?.data);
					console.error(error);
				});
		} else {
			alert('기부 포인트는 현재 보유한 포인트 이하로 설정해주세요.');
		}
	};

	// const
	useEffect(() => {
		console.log(userName);
		const accessToken = localStorage.getItem('accessToken');
		const headers = {
			'Content-type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		};
		// console.log(`토근 잘옴 ${accessToken}`);

		// 유저정보가 있으면, 현재 가진 포인트를 끌어오는 함수.
		if (userName) {
			axios
				.get<MyPointResponse>(`https://j8b205.p.ssafy.io/api/point`, { headers })
				.then((response) => {
					const data = response.data;
					// console.log(data);
					// console.log(response);
					setCurrentPoint(data.totalPoint);
				})
				.catch((error) => {
					console.error(error);
				});
		}

		// 전체 모금액, 이번달 모금액을 전달받는 함수.
		// console.log('모금액받아오자');
		axios
			.get<FundraiserInfoResponse>(`https://j8b205.p.ssafy.io/api/donation`, { headers })
			.then((res) => {
				// console.log(res);
				// console.log(res.data);
				// console.log('asdasd');
				const data = res.data;
				setDdonationThisMonth(data.donationAmountOnMonth);
				setTotalDonation(data.totalDonationAmount);
			})
			.catch((err) => {
				console.error(err);
			});
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
