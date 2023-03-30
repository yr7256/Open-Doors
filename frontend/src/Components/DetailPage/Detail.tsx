import React from 'react';
import { useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import { Menu } from '../../styles/Kakao/SearchAddress';

const Detail = () => {
	const { id } = useParams();
	// 여기서 id로 통신해서 데이터 받아오기
	return (
		<div>
			{id}
			<Menu>
				<Link to="/map/detail/:id/home"> 홈 </Link>
				<Link to="/map/detail/:id/review"> 리뷰 </Link>
			</Menu>
			<Outlet />
		</div>
	);
};

export default Detail;
