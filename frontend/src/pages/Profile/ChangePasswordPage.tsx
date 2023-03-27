import React from 'react';
import { Head, Line } from '../../styles/Menu/NavStyle';
import Footer from '../../Components/Menu/Footer';
import ChangePassword from '../../Components/Auth/ChangePassword';

function ChangePasswordPage() {
	return (
		<>
			<Head>비밀번호 변경</Head>
			<Line />
			<ChangePassword />
			<Footer />
		</>
	);
}

export default ChangePasswordPage;
