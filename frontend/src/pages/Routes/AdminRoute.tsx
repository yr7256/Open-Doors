import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

type UserState = {
	user: {
		username: string;
	};
};

// 관리자만 접근 
const AdminRoute = () => {
	const name = useSelector((state: UserState) => state.user.username);

	if (name !== "admin") {
		alert('권한이 없습니다.');
	}

	return name === "admin" ? <Outlet /> : <Navigate to="/Login" />;
};

export default AdminRoute;
