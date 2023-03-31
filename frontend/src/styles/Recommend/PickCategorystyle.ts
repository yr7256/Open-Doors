import styled from 'styled-components';

export const Fotter = styled.div`
	background-color: white;
	z-index: 10;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	text-align: center;
	& > form > h4 {
		text-align: center;
	}
	& > form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	& > form > * {
		margin-top: 8px;
		margin-bottom: 8px;
	}
`;

export const Active = styled.button`
	width: 80px;
	border-radius: 50%;
	&.active {
		background-color: #c2dce8;
		border-radius: 50%;
	}
`;
