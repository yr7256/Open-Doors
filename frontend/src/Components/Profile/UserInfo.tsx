import React, { useState } from 'react';
import axios from 'axios';
import { CenterP, Total } from '../../styles/Profile/MyPagestyle';
import { useSelector } from 'react-redux';

type UserState = {
	user: {
		username: string;
		password: string;
		name: string;
	};
};

function UserInfo() {
	const [totalPoints, setTotalPoints] = useState<number>(0);
	const name = useSelector((state: UserState) => state.user.name);

	const fetchDonations = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			const headers = {
				'Content-type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			};
			const res = await axios.get('https://j8b205.p.ssafy.io/api/point/record', { headers });
			setTotalPoints(res.data.totalPoint);
		} catch (error) {
			console.error('Error fetching donations:', error);
		}
	};

	fetchDonations();

	return (
		<>
			<CenterP>
				{name}
				<Total>기부포인트: {totalPoints}</Total>
			</CenterP>
		</>
	);
}
export default UserInfo;
