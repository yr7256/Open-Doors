import styled from 'styled-components';

export const DonationDescStyle = styled.div`
	height: 30%;
	background-color: #eff4fa;
	padding-top: 10%;
	padding-bottom: 10%;
	padding-left: 3%;

	& span {
		/* span 태그에 대한 스타일을 지정합니다. */
		line-height: 150%;
	}

	& em {
		/* em 태그에 대한 스타일을 지정합니다. */
		font-weight: bold;
	}

	& .linkDiv {
		display: flex;
		align-items: center; /* 텍스트와 이미지 수직 중앙 정렬을 위해 추가 */
	}

	& a {
		color: #3b82f6;
		margin-left: 0.5em;
		line-height: 150%;
	}

	& > div > img {
		width: 12%;
		height: 12%;
	}
`;

export const DonationLine = styled.div`
	border-top: 1px solid #d9d9d9;
`;

export const DonationFormOuterDiv = styled.div`
	padding-top: 5%;
	padding-bottom: 10%;
	padding-left: 10%;
	padding-right: 10%;

	& span {
		/* span 태그에 대한 스타일을 지정합니다. */
	}

	& em {
		/* em 태그에 대한 스타일을 지정합니다. */
		font-weight: bold;
	}

	& a {
		color: #3b82f6;
		margin-left: 0.5em;
	}

	& .verticalSpace {
		margin-top: 10%;
	}

	& .flexCol {
		display: flex;
		flex-direction: column;
	}

	& .flexEnd {
		align-items: flex-end;
	}

	& > div {
		border-radius: 10px;
	}

	& .flexRow {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}

	& .flexRowCenter {
		display: flex;
		align-items: center; /* 텍스트와 이미지 수직 중앙 정렬을 위해 추가 */
		justify-content: space-between;
	}

	& .yellowDiv {
		background-color: #fffbe6;
		height: 30%;
		padding: 5%;
	}

	& .flexEndLetters {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		line-height: 1.2;
	}

	& .textRight {
		text-align: right;
	}

	& .blueDiv {
		background-color: #cfdeef;
		height: 30%;
		padding: 5%;
	}

	& .inputDiv {
	}

	& .fundraiserTitle {
		font-size: 1.1rem;
	}

	& .smallDesc {
		text-align: center;
		margin-top: 3%;
		font-size: 0.8rem;
	}

	& > div > div > div > img {
		width: 25%;
		height: 25%;
	}
`;

export const InputBox = styled.input`
	margin-left: 2%;
	margin-right: 2%;
	width: 50%;
	height: 2rem;
	padding: 0.5rem;
	color: #000;
	background-color: #fff;
	border: 1px solid #3b82f6;
	border-radius: 0.25rem;
	transition: border-width 0.2s ease-in-out;
	text-align: right;

	&:focus {
		outline: none;
		border-width: 2px;
	}
`;

export const Button = styled.button`
	background-color: #d9d9d9;
	border-radius: 12px;
	border: none;
	padding: 10px 15px;
	color: #000;
	margin-top: 10px;
	margin-left: auto;
	// align-self: flex-end;
`;

export const DonationButton = styled.button`
	margin-top: 15%;
	background-color: #fff;
	border-radius: 4px;
	border: 2px solid #3b82f6;
	padding: 10px 15px;
	color: #3b82f6;
	// margin-top: 10px;
	align-self: flex-end;
	transition: all 0.1s ease-in-out;
	width: 100%;

	&:hover {
		background-color: #3b82f6;
		color: #fff;
		cursor: pointer;
	}
`;
