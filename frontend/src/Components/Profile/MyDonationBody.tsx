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
	NoDataDiv,
} from '../../styles/Profile/MyDonationStyled';

type UserState = {
	user: {
		username: string;
		password: string;
		name: string;
	};
};

interface MyDonationBodyProps {
	cardDatas: Donation[] | null; // 여기서는 이미 정의된 Donation 인터페이스를 사용했습니다.
}

function MyDonationBody({ cardDatas }: MyDonationBodyProps) {
	const userName = useSelector((state: UserState) => state.user.username);
	const name = useSelector((state: UserState) => state.user.name);
	// cardDatas = [
	// 	{
	// 		createdAt: '2023-04-05',
	// 		source: '배리어프리 장소 등록',
	// 		pointChange: 100,
	// 	},
	// 	{
	// 		createdAt: '2023-04-05',
	// 		source: '대전교통약자이동지원센터',
	// 		pointChange: -1000,
	// 	},
	// 	{
	// 		createdAt: '2023-04-05',
	// 		source: '배리어프리 장소 등록',
	// 		pointChange: 100,
	// 	},
	// ];

	function formatDate(date: string): string {
		const [year, month, day] = date.split('-');
		const shortYear = year.slice(2);
		return `${shortYear}.${month}.${day}`;
	}

	const cardComponents = cardDatas ? (
		cardDatas.map((item, index) => (
			<DonationCard key={index}>
				<DateText>{formatDate(item.createdAt)}</DateText>
				<ContentRow>
					<ReasonText>{item.source}</ReasonText>
					<PointsChangeText isNegative={item.pointChange < 0}>
						{item.pointChange < 0 ? item.pointChange : `+${item.pointChange}`}
					</PointsChangeText>
				</ContentRow>
			</DonationCard>
		))
	) : (
		<NoDataDiv>기부 포인트 내역 정보가 없습니다.</NoDataDiv>
	);

	// console.log(`asdasd${cardDatas} ${typeof cardDatas}`);
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
			<MyDonationBodyStyled>
				<div className="cards-container">{cardComponents}</div>
			</MyDonationBodyStyled>
		</>
	);
}
export default MyDonationBody;
