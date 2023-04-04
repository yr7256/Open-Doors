import styled from 'styled-components';

export const MyTotalPointStyled = styled.div`
	width: 100%;
	padding: 5%;
	padding-left: 10%;
    padding-top: 0%
	background-color: white;

	& > div > em {
		font-weight: bold;
		line-height: 1.5;
		font-size: 1.2rem;
	}

	& > div > span {
		font-size: 1.2rem;
		line-height: 1.5;
	}
	// box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	// margin-bottom: 5%;
`;

export const MyDonationBodyStyled = styled.div`
	width: 100%;
	padding: 5%;
	background-color: white;
	// box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	// margin-bottom: 5%;
`;

export const DonationCard = styled.div`
	width: 100%;
	padding: 5%;
	background-color: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin-bottom: 5%;
`;

export const DateText = styled.div`
	//   font-size: 16px;
	font-weight: bold;
	margin-bottom: 8px;
`;

export const ContentRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const ReasonText = styled.div`
	// font-size: 14px;
	font-size: 1rem;
`;

export const PointsChangeText = styled.div<{ isNegative: boolean }>`
	font-size: 1rem;
	color: ${({ isNegative }) => (isNegative ? '#6393cb' : '#dd3e3e')};
`;
