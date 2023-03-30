import styled from 'styled-components';

export const Fotter = styled.div`
	position: absolute;
	background-color: white;
	width: 100vw;
	height: 45vh;
	border-radius: 24px 24px 0 0;
	bottom: 9vh;
	z-index: 10;
	margin: 0 auto;
`;

export const Active = styled.button`
	border-radius: 50%;
	&.active {
		background-color: #c2dce8;
		border-radius: 50%;
	}
`;
