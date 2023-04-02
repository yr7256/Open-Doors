import styled from 'styled-components';

export const Form = styled.textarea`
	width: 100%;
	height: 124px;
	border-color: #d9d9d9;
	box-shadow: 2px 4px 1px 1px #d9d9d9;
	margin-top: 20px;
	margin-bottom: 44px;
	padding: 1rem;
`;

export const P = styled.p`
	font-weight: 700;
	font-size: 24px;
`;

export const StarContainer = styled.div`
	display: flex;
	text-align: center;
	margin: 13px 0px;
	margin-bottom: 40px;
	.active {
		color: #ffd600;
	}
`;

export const Img = styled.img`
	width: 100px;
	height: 100px;
`;

export const Input = styled.input`
	position: absolute;
	width: 0;
	height: 0;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	border: 0;
`;
