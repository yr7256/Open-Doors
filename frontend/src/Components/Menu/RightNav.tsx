import { Ul, Li, Image, MenuImg } from '../../styles/Menu/styles';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import basicimg from '../../assets/img/basicimg.png';

type Props = {
	open: boolean;
};

type UserState = {
	user: {
		userImg: string;
	};
};

function RightNav(props: Props) {
	const [myImage, setMyImage] = useState(`${basicimg}`);
	return (
		<>
			<Ul open={props.open}>
				<MenuImg>
					<Image src={myImage} alt="my-image" />
				</MenuImg>
				<NavLink
					to="/myloc"
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
					to="/donation"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li>기부하기</Li>
				</NavLink>
				<NavLink
					to="/help"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li>문의하기</Li>
				</NavLink>
			</Ul>

			<Routes>
				<Route path="/myloc" />
				<Route path="/map/newlocation" />
				<Route path="/donation" />
				<Route path="/help" />
				{/* <Route element={<Navigate replace to="/menu1" />} /> */}
			</Routes>
		</>
	);
}

export default RightNav;
