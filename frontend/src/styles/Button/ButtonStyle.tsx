import styled from 'styled-components';

export const Button = styled.button`
	border: 1px solid #3b82f6;
	width: 300px;
	height: 52px;
	color: #3b82f6;
	// margin-left: 28px;
	// margin-bottom: 32px;
	// margin-top: 12px;
	font-size: 24px;

	&:active {
		background-color: #3b82f6;
		color: #ffffff;
	}
`;

export const MiniButton = styled.button`
	border: 1px solid #3b82f6;
	width: 100px;
	height: 40px;
	border-radius: 4px;
	color: #3b82f6;
	text-align: center;
	/* margin-bottom: 20px; */
	/* margin-top: 8px; */
	margin-left: 12px;
	font-size: 22px;

	&:active {
		background-color: #3b82f6;
		color: #ffffff;
	}
`;

export const PhotoButton = styled.button`
	border: 1px solid #abb5be;
	width: 100%;
	height: 52px;
	color: #abb5be;
	/* margin-left: 28px; */
	margin-bottom: 32px;
	margin-top: 12px;
	font-size: 24px;
`;
