import { Ul, Li } from './styles';

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
					<Li>Menu 1</Li>
				</NavLink>
				<NavLink
					to="/menu2"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li>Menu 2</Li>
				</NavLink>
				<NavLink
					to="/menu3"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li>Menu 3</Li>
				</NavLink>
				<NavLink
					to="/menu4"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li>Menu 4</Li>
				</NavLink>
				<NavLink
					to="/menu5"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : '',
						color: isActive ? '#0DADEA' : '',
					})}
				>
					<Li>Menu 5</Li>
				</NavLink>
			</Ul>

			<Routes>
				<Route path="/menu1" />
				<Route path="/menu2" />
				<Route path="/menu3" />
				<Route path="/menu4" />
				<Route path="/menu5" />
				<Route element={<Navigate replace to="/menu1" />} />
			</Routes>
		</>
	);
}

export default RightNav;
