import styled from 'styled-components';

export const ModalBackGround = styled.div`
	background-color: rgba(0, 0, 0, 0.4);
	width: 130%;
	height: 100%;
	position: absolute;
	bottom: 10;
	left: 0;
`;

export const ModalWrap = styled.div`
	width: 100vw;
	height: 100vh;
`;

export const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: center;
	align-items: center;
	border-radius: 0.6rem;
	gap: 1.5rem;
	padding: 2rem 1rem;
	position: absolute;
	top: 15rem;
	width: 80%;
	left: 2.6rem;
	background-color: white;
`;

export const P = styled.div`
	font-size: 20px;
	color: red;
`;
