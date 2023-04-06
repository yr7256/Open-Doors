import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Img = styled.img`
	height: 25vh;
	width: 100%;
`;

export const H2 = styled.h2`
	margin-top: 20px;
	text-align: center;
	font-size: 28px;
`;

export const Line = styled.div`
	height: 2px;
	background-color: #d9d9d9;
	margin: 16px;
`;

export const Link = styled(NavLink)`
	color: black;

	&.active {
		color: #4a6e98;
	}
`;

export const H1 = styled.h1`
	text-align: center;
`;

export const Photo = styled.img`
	object-fit: cover;
	width: 144px;
	height: 144px;
	margin-left: 1rem;
	margin-bottom: 1rem;
`;

export const H4 = styled.h4`
	margin-top: 20px;
	text-align: center;
	margin-bottom: 20px;
`;

export const PhotoContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	position: relative;
`;

export const MainImage = styled.div`
	height: 25vh;
	width: 100%;
	position: relative;
`;

export const BackIcon = styled.img`
	width: 32px;
	height: 32px;
	margin: 1rem;
	position: absolute;
`;

export const CancelIcon = styled.img`
	width: 40px;
	height: 40px;
	margin: 0.9rem;
	position: absolute;
	right: 0.5%;
	padding: 0;
`;

export const Icon = styled.image`
	width: 36px;
	height: 36px;
	margin: 0;
`;

export const Div = styled.div`
	margin-top: 0.5rem;
	text-align: center;
`;

export const Score = styled.span`
	font-size: 24px;
	font-weight: bold;
	margin-right: 0.4rem;
	margin-left: 0.4rem;
`;

export const Review = styled.span`
	font-size: 24px;
	margin-right: 0.2rem;
	margin-left: 0.2rem;
`;
