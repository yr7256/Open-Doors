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
