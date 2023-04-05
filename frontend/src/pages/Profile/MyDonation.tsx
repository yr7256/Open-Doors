import React, { useEffect, useState } from 'react';
import { Head, Line, Title } from '../../styles/Menu/NavStyle';
import GoBackPage from '../../Components/Menu/goBackPage';
import Footer from '../../Components/Menu/Footer';
import MyDonationBody from '../../Components/Profile/MyDonationBody';
import MyDonationHeader from '../../Components/Profile/MyDonationHeader';
import { DonationLine } from '../../styles/Donation/DonationStyled';
import axios from 'axios';

function MyDonation() {
	const [totalPoints, setTotalPoints] = useState(0);
	const [cardDatas, setCardDatas] = useState(null);

	useEffect(() => {
		console.log('asdasd');
		const fetchDonations = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken');
				const headers = {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				};
				const res = await axios.get('https://j8b205.p.ssafy.io/api/point/record', { headers });

				setTotalPoints(res.data.totalPoint);
				setCardDatas(res.data.pointRecords);
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
			<MyDonationHeader totalPoint={totalPoints}></MyDonationHeader>
			<DonationLine />
			<MyDonationBody cardDatas={cardDatas}></MyDonationBody>
			<Footer />
		</>
	);
}

export default MyDonation;
