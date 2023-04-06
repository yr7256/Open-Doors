import React from 'react';
import LoginInput from '../../Components/Auth/LoginInput';
import GoBackPage from '../../Components/Menu/goBackPage';
import { Head, BannerLine, Title } from '../../styles/Menu/NavStyle';

function Login() {
	return (
		<>
			<Head>
				<div className="grid grid-cols-16 gap-1">
					<div className="col-start-2 col-span-2">
						<GoBackPage></GoBackPage>
					</div>
					<div className="col-start-4 col-end-8">
						<Title>로그인</Title>
					</div>
				</div>
			</Head>
			<BannerLine />
			<LoginInput></LoginInput>
		</>
	);
}
export default Login;
