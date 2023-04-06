import styled from 'styled-components';

export const NoTrafficInfo = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	color: #d9d9d9;
`;

export const TrafficInfoHeaderContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

export const TrafficInfoHeader = styled.div`
	align-self: center;
	& > span {
		font-size: 1.4rem;
	}

	& > em {
		font-size: 1.4rem;
		color: #4a6e98;
	}
`;

export const LineDiv = styled.div`
	width: 95%;
	border-top: 2px solid #d9d9d9;
	align-self: center;
	margin: 2%;
`;

// 아래 Div 자체에 link를 걸어야됨.
export const TaxiCallDiv = styled.div`
	padding: 3% 0% 3% 0%;
	display: flex;
	align-items: center;

	& > img {
		width: 10%;
		height: 10%;
		margin-right: 1%;
	}

	& > span {
		// font-size: ;
	}

	& > a {
		// font-size: ;
		color: #6393cb;
	}
`;

export const TrafficTitleWrapper = styled.div`
	padding: 3% 3% 3% 5%;
	& > span {
		font-size: 1.3rem;
	}

	& > em {
		font-size: 1.3rem;
		font-weight: bold;
	}
`;

export const TrafficInfoBoxWrapper = styled.div``;

// export const LineFullWidth = styled.div`
//     width: 95%
//     border-top: 1px solid #d9d9d9;

//     & .

// `;

export const TrafficInfoBox = styled.div`
	border-radius: 5px;
	border: 2px solid #d9d9d9;

	& > .busStopTitle {
		font-size: 1rem;
		margin-bottom: 1.5%;
	}

	& > .busStopNum {
		font-size: 0.8rem;
		margin-bottom: 1.5%;
	}

	& > .busStopInfo {
		display: inline-block;
		margin-bottom: 2%;
	}

	& > img {
		display: inline-block;
		transform: scale(1.5);
		margin-top: 1.5%;
		margin-left: 1.5%;
		// margin: 1.5%;
		// padding: 1.5%;
		// margin-left: 1%;
		// margin-right: 1%;
		width: 8%;
		height: 8%;
	}

	& > .horizontalLine {
		width: 100%;
		border-top: 2px solid #d9d9d9;
	}
`;

export const BusArrDiv = styled.div`
	width: 100%;
	padding-left: 5%;
	padding-right: 5%;
	padding-top: 2%;
	padding-bottom: 2%;

	& .flexrow {
		display: flex;
		justify-content: space-between;

		& > div > em {
			font-weight: bold;
			font-size: 1.15rem;
		}

		& .spanContainer {
			display: flex;
			justify-content: space-between;
			width: 30%;
		}

		& .min {
			// margin-right: 2%; // 여기에 원하는 간격을 추가하세요. (2% 혹은 16px)
			font-size: 1rem;
			color: #e91818;
		}

		& .position {
			// margin-left: 1%;

			font-size: 1rem;
		}
	}

	& .direction {
		text-align: right;
		font-size: 0.8rem;
		color: #6393cb;
	}
`;
