import styled from 'styled-components';

interface INav {
	open: boolean;
}

export const StyledBurger = styled.div<INav>`
	position: fixed;
	top: 1.7vh;
	width: 2rem;
	height: 2rem;
	right: 2vh;
	cursor: pointer;
	z-index: 151;
	@media {
		display: flex;
		justify-content: space-around;
		flex-flow: column nowrap;
	}
`;

export const Menus = styled.div<INav>`
	width: 2rem;
	height: 0.25rem;
	background-color: #000;
	border-radius: 10px;
	transform-origin: 1px;
	transition: all 0.3s linear;
	cursor: pointer;
	&:nth-child(1) {
		transform: ${(props) => (props.open ? 'rotate(45deg)' : 'rotate(0)')};
	}
	&:nth-child(2) {
		transform: ${(props) => (props.open ? 'translateX(100%)' : 'translateX(0)')};
		opacity: ${(props) => (props.open ? 0 : 1)};
	}
	&:nth-child(3) {
		transform: ${(props) => (props.open ? 'rotate(-45deg)' : 'rotate(0)')};
	}
`;

export const Nav = styled.nav`
	font-family: 'Zilla Slab', sans-serif;
	height: 100%;
	display: flex;
	justify-content: space-between;
	background-color: #fdfdfdfa;
	align-items: center;
	position: relative;
	@media {
		width: 100vw;
	}
`;

export const Ul = styled.ul<INav>`
	font-family: 'Zilla Slab', sans-serif;
	list-style: none;
	display: flex;
	flex-flow: row nowrap;
	position: absolute;
	top: 0;
	justify-content: flex-end;
	margin-top: 28px;
	// align-items: center;
	font-size: 18px;
	height: 110px;
	margin-left: 20px;
	a {
		text-decoration: none;
		text-transform: none;
		color: #000;
		cursor: pointer;
		&:hover {
			color: #0dadea;
		}
	}
	@media {
		flex-flow: column nowrap;
		background-color: #fdfdfdfa;
		position: fixed;
		transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(100%)')};
		top: -28px;
		right: 0;
		height: 100%;
		width: 66vw;
		padding-top: 3.5rem;
		transition: transform 0.3s ease-in-out;
		z-index: 150;
		justify-content: normal;
	}
`;

export const Li = styled.li`
	padding: 0 0 0 16px;
	outline: none;
	font-size: 24px;
	margin-top: 20px;
	margin-bottom: 20px;
	@media {
		color: #000;
		margin-right: 34px;
		&:hover {
			color: #0dadea;
		}
	}
`;

export const Image = styled.img`
	width: 120px;
	height: 120px;
	text-align: center;
	margin: 16px auto;
`;

export const MenuImg = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 5vh;
	flex-direction: column;
	text-align: center;
`;

export const Line = styled.div`
	height: 2px;
	margin: 0 12px 0 12px;
	background-color: #d9d9d9;
`;

export const H4 = styled.p`
	font-size: 22px;
	margin-bottom: 8px;
`;
