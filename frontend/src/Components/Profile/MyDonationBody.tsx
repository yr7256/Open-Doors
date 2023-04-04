import React from 'react';
import { CenterP } from '../../styles/Profile/MyPagestyle';
import { useSelector } from 'react-redux';
import MyDonationCard from './MyDonationCard';
import { Donation } from '../../types/donation';
import {
	MyDonationBodyStyled,
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

interface MyDonationBodyProps {
	cardDatas: Donation[]; // 여기서는 이미 정의된 Donation 인터페이스를 사용했습니다.
}

function MyDonationBody({ cardDatas }: MyDonationBodyProps) {
	const userName = useSelector((state: UserState) => state.user.username);
	const name = useSelector((state: UserState) => state.user.name);

	const cardComponents = cardDatas
		? cardDatas.map((item, index) => (
				<DonationCard key={index}>
					<DateText>{item.date}</DateText>
					<ContentRow>
						<ReasonText>{item.reason}</ReasonText>
						<PointsChangeText isNegative={item.pointsChange < 0}>{item.pointsChange}</PointsChangeText>
					</ContentRow>
				</DonationCard>
		  ))
		: null;
	// const cardComponents = cardDatas.map((item, index) => (
	// 	<DonationCard key={index}>
	// 		<DateText>{item.date}</DateText>
	// 		<ContentRow>
	// 			<ReasonText>{item.reason}</ReasonText>
	// 			<PointsChangeText isNegative={item.pointsChange < 0}>{item.pointsChange}</PointsChangeText>
	// 		</ContentRow>
	// 	</DonationCard>
	// ));

	return (
		<>
			<MyDonationBodyStyled>{cardComponents}</MyDonationBodyStyled>
		</>
	);
}
export default MyDonationBody;
