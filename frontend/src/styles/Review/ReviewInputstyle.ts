import styled from 'styled-components';

export const Form = styled.input.attrs({
	placeholder: '여러분의 후기를 입력해주세요!',
})`
	width: 100%;
	height: 124px;
	box-shadow: 4px 1px 1px #d9d9d9;
	margin-top: 20px;
	margin-bottom: 44px;
`;

export const P = styled.p`
	font-weight: 700;
	font-size: 24px;
`;

export const StarContainer = styled.div`
	display: flex;
	text-align: center;
	margin: 13px 0px;
	.active {
		color: #ffd600;
	}
`;
