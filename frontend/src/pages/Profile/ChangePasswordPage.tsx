import React from 'react';
import { Head, Line } from '../../styles/Nav/NavStyle';
import ChangePassword from '../../Components/Auth/ChangePassword';

function ChangePasswordPage() {
	return (
		<>
			<Head>비밀번호 변경</Head>
			<Line />
			<ChangePassword />
		</>
	);
}

export default ChangePasswordPage;
