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
	& > p {
		margin: 3vh auto;
		text-align: center;
		font-size: 18px;
	}
	& > #map {
		width: 100%;
		height: 64vh;
	}
`; 

export const Bottom = styled.div`
	& > p {
		font-size: 18px;
		position: absolute;
		left: 3vh;
		bottom: 3vh;
		width: 80vw;
		height: 18px;
	}
	& > button {
		position: absolute;
		right: 3vh;
		bottom: 3vh;
	}
`;