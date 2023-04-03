import styled from 'styled-components';

export const Head = styled.div`
	margin-top: 4vh;
	margin-bottom: 4vh;
	text-align: center;
	& > .back {
		position: absolute;
		left: 4vh;
		top: 4vh;
	}
`;

export const Line = styled.div`
	border-top: 1px solid #d9d9d9;
	margin-bottom: 3vh;
`;

export const Menu = styled.div`
	margin-top: 4vh;
	text-align: center;
	& > a {
		display: inline;
		color: black;
		font-family: 'SUIT-Bold';
		font-size: 28px;
		margin: 0 5vw 0 5vw;
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	flex-grow: 1;
	& > p {
		margin: 3vh auto;
		text-align: center;
		font-size: 18px;
	}
	& > #map {
		width: 100vw;
		height: 60vh;
	}
`; 

export const Bottom = styled.div`
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 6vh 0 0 0;
	& > button {
		position: absolute;
		right: 6vw;
	}
	& > p {
		position: absolute;
		left: 6vw;
	}
`