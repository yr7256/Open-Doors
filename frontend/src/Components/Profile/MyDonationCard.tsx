import React, { useState } from 'react';
import { CenterP } from '../../styles/Profile/MyPagestyle';
import { useSelector } from 'react-redux';
import {
	DonationCard,
	DateText,
	ContentRow,
	ReasonText,
	PointsChangeText,
} from '../../styles/Profile/MyDonationStyled';

type UserState = {
	user: {
		username: string;
		password: string;
		name: string;
	};
};

function MyDonationCard() {
	const userName = useSelector((state: UserState) => state.user.username);
	const name = useSelector((state: UserState) => state.user.name);
	const [pointsChange, setPointsChange] = useState(0);
	const isNegative = pointsChange < 0;

	return (
		<>
			<DonationCard>
				<DateText>{DateText}</DateText>
				<ContentRow>
					<ReasonText>{ReasonText}</ReasonText>
					<PointsChangeText isNegative={isNegative}>
						{pointsChange > 0 ? '+' : ''}
						{pointsChange}P
					</PointsChangeText>
				</ContentRow>
			</DonationCard>
		</>
	);
}
export default MyDonationCard;
