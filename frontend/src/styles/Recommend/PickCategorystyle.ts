import styled from 'styled-components';

export const Fotter = styled.div`
	// position: absolute;
	background-color: white;
	// width: 100vw;
	// height: 45vh;
	// border-radius: 24px 24px 0 0;
	// bottom: 9vh;
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
