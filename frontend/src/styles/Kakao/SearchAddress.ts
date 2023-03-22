import styled from 'styled-components';

export const Head = styled.div`
	margin-top: 32px;
	margin-bottom: 32px;
	text-align: center;
	& > .back {
		position: absolute;
		left: 32px;
		top: 32px;
	}
`;

export const Line = styled.div`
	border-top: 1px solid #d9d9d9;
	margin-bottom: 24px;
`;

export const Menu = styled.div`
	margin-top: 4vh;
	& > * {
		display: inline;
		margin: 0 0 0 11vw;
	}
	& > a {
		color: black;
		font-family: 'SUIT-Bold';
		font-size: 28px;
	}
`;

export const Container = styled.div`
	& > p {
		margin: 24px auto;
		text-align: center;
		font-size: 18px;
	}
	& > #map {
		width: 100vw;
		height: 65vh;
	}
`; 