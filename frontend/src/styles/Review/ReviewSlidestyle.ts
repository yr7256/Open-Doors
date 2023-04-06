import styled from 'styled-components';

const SliderContainer = styled.div`
	position: relative;
	overflow: hidden;
`;

const Slides = styled.div`
	display: flex;
	width: calc(100% * 3); /* 슬라이드 개수에 맞게 조정 */
	transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
	width: 100%;
`;

const PrevButton = styled.button`
	position: absolute;
	top: 50%;
	left: 10px;
	transform: translateY(-50%);
	padding: 10px;
	background: none;
	border: none;
	cursor: pointer;
`;

const NextButton = styled.button`
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	padding: 10px;
	background: none;
	border: none;
	cursor: pointer;
`;
