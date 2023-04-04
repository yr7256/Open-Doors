import React, { useEffect, useState } from 'react';
import { Head, Line, Title } from '../../styles/Menu/NavStyle';
import GoBackPage from '../../Components/Menu/goBackPage';
import Footer from '../../Components/Menu/Footer';
import MyDonationBody from '../../Components/Profile/MyDonationBody';
import MyDonationHeader from '../../Components/Profile/MyDonationHeader';
import axios from 'axios';
import { DonationLine } from '../../styles/Donation/DonationStyled';

function MyDonation() {
	const [totalPoints, setTotalPoints] = useState(0);
	const [cardDatas, setCardDatas] = useState([]);

	useEffect(() => {
		const fetchDonations = async () => {
			try {
				const response = await axios.get('YOUR_API_URL'); // 😀 APICALL 수정 필요
				setTotalPoints(response.data.totalPoints);
				setCardDatas(response.data.cardDatas);
			} catch (error) {
				console.error('Error fetching donations:', error);
			}
		};

		fetchDonations();
	}, []);

	return (
		<>
			<Head>
				<div className="grid grid-cols-16 gap-1">
					<div className="col-start-2 col-span-2">
						<GoBackPage></GoBackPage>
					</div>
					<div className="col-start-4 col-end-8">
						<Title>기부포인트 내역</Title>
					</div>
				</div>
			</Head>
			<Line />
			<MyDonationHeader totalPoints={totalPoints}></MyDonationHeader>
			<DonationLine />
			<MyDonationBody cardDatas={cardDatas}></MyDonationBody>
			<Footer />
		</>
	);
}

export default MyDonation;
