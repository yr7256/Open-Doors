import styled from 'styled-components';

export const FooterBlock = styled.div`
	display: flex;
	// margin: 12px auto;
	width: 100%;
	justify-content: center;
	& > div {
		width: 33vw;
	}
`;

export const FooterPlace = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 9vh;
	text-align: center;
	display: flex;
	align-items: center;
	background-color: white;
	z-index: 18;
`;

export const Image = styled.img`
	height: 32px;
	width: 32px;
	margin: 0 auto;
`;

export const FooterP = styled.p`
	/* margin-left: 16px; */
	margin-top: 8px;
	margin-right: 0px;
`;

export const Line = styled.div`
	border-top: 1px solid #d9d9d9;
`;
