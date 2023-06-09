import React from 'react';
import { Head, Line, Menu } from '../../styles/Kakao/SearchAddress';
import { useNavigate, Link, Outlet } from 'react-router-dom';

const SearchAddress = () => {
	const navigate = useNavigate();

	return (
		<>
			<Head>
				<h1
					className="back"
					onClick={() => {
						navigate('/map/newlocation');
					}}
				>
					&lt;
				</h1>
				<h1>위치</h1>
			</Head>
			<Line />
			<Menu>
				<Link to="/map/newlocation/search/main"> 주소검색 </Link>
				<Link to="/map/newlocation/search/marker"> 지도에서 선택 </Link>
			</Menu>
			<Outlet />
		</>
	);
};

export default SearchAddress;
