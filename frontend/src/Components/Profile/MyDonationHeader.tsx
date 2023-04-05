import React from 'react';
import { CenterP } from '../../styles/Profile/MyPagestyle';
import { useSelector } from 'react-redux';
import MyDonationCard from './MyDonationCard';
import { MyDonationBodyStyled, MyTotalPointStyled } from '../../styles/Profile/MyDonationStyled';

interface MyDonationHeaderProps {
	totalPoint: number;
}

function MyDonationHeader({ totalPoint }: MyDonationHeaderProps) {
	return (
		<>
			<MyTotalPointStyled>
				<div>
					<span>보유</span>
				</div>
				<div>
					<em>{totalPoint ? totalPoint : 0} P</em>
				</div>
			</MyTotalPointStyled>
		</>
	);
}
export default MyDonationHeader;
