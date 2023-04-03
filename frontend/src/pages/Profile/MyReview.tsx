import React from 'react';
import Footer from '../../Components/Menu/Footer';
import GoBackPage from '../../Components/Menu/goBackPage';
import Myreview from '../../Components/Profile/MyReview';
import { Head, Line, Title } from '../../styles/Menu/NavStyle';

function MyReview() {
	return (
		<>
			<Head>
				<div className="grid grid-cols-16 gap-1">
					<div className="col-start-2 col-span-2">
						<GoBackPage></GoBackPage>
					</div>
					<div className="col-start-4 col-end-8">
						<Title>리뷰 내역</Title>
					</div>
				</div>
			</Head>
			<Line />
			<Myreview></Myreview>
			<Footer />
		</>
	);
}

export default MyReview;
