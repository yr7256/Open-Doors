import React, { useEffect, useState } from 'react';
import { DonationFormOuterDiv, InputBox, Button, DonationButton } from '../../styles/Donation/DonationStyled';

function DonationForm() {
	const donationThisMonth = 12000;
	const totalDonation = 150000;
	const nickname = 'name';

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
		setTimeout(() => {
			setIsButtonClicked(false);
		}, 1000);
	};

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
						<span>현재 {nickname}님의 </span>

						<em>보유 포인트: {currentPoint.toLocaleString()}P</em>
					</div>
				</div>
				<div className="yellowDiv verticalSpace">
					<div className="flexCol">
						<div className="flexRow">
							기부할 포인트:{' '}
							<InputBox value={donationPoint} onChange={(e) => setDonationPoint(parseInt(e.target.value))}></InputBox>P
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
