import { Ul, Li } from '../../styles/Menu/styles';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';

type Props = {
	open: boolean;
};

function RightNav(props: Props) {
	return (
		<>
			<Ul open={props.open}>
				<NavLink
					to="/menu1"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li>내가 등록한 장소</Li>
				</NavLink>
				<NavLink
					to="/map/newlocation"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li>장소 등록하기</Li>
				</NavLink>
				<NavLink
					to="/menu3"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li>기부하기</Li>
				</NavLink>
				<NavLink
					to="/menu4"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li>문의하기</Li>
				</NavLink>
			</Ul>

			<Routes>
				<Route path="/menu1" />
				<Route path="/map/newlocation" />
				<Route path="/menu3" />
				<Route path="/menu4" />
				<Route element={<Navigate replace to="/menu1" />} />
			</Routes>
		</>
	);
}

export default RightNav;
