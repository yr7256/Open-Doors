import React from 'react';
import { Head, Line, Title } from '../../styles/Menu/NavStyle';
import GoBackPage from '../../Components/Menu/goBackPage';
import Footer from '../../Components/Menu/Footer';

function MyDonation() {
	return (
		<>
			<Head>
				<div className="grid grid-cols-16 gap-1">
					<div className="col-start-2 col-span-2">
						<GoBackPage></GoBackPage>
					</div>
					<div className="col-start-4 col-end-8">
						<Title>기부포인트 내역</Title>
					</div>
				</div>
			</Head>
			<Line />
			<p>기부내역</p>
			<Footer />
		</>
	);
}

export default MyDonation;
