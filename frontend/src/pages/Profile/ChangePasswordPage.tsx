import React from 'react';
import { Head, Line, Title } from '../../styles/Menu/NavStyle';
import GoBackPage from '../../Components/Menu/goBackPage';
import Footer from '../../Components/Menu/Footer';
import ChangePassword from '../../Components/Auth/ChangePassword';

function ChangePasswordPage() {
	return (
		<>
			<Head>
				<div className="grid grid-cols-16 gap-1">
					<div className="col-start-2 col-span-2">
						<GoBackPage></GoBackPage>
					</div>
					<div className="col-start-4 col-end-8">
						<Title>비밀번호 변경</Title>
					</div>
				</div>
			</Head>
			<Line />
			<ChangePassword />
			<Footer />
		</>
	);
}

export default ChangePasswordPage;
