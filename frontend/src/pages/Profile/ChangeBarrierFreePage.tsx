import React from 'react';
import { Head, Line, Title } from '../../styles/Menu/NavStyle';
import GoBackPage from '../../Components/Menu/goBackPage';
import Footer from '../../Components/Menu/Footer';
import ChangeBarrierFree from '../../Components/Auth/ChangeBarrierFree';

function ChangeBarrierFreePage() {
	return (
		<>
			<Head>
				<div className="grid grid-cols-16 gap-1">
					<div className="col-start-2 col-span-2">
						<GoBackPage></GoBackPage>
					</div>
					<div className="col-start-4 col-end-8">
						<Title>배리어프리 여부</Title>
					</div>
				</div>
			</Head>
			<Line />
			<ChangeBarrierFree />
			<Footer />
		</>
	);
}

export default ChangeBarrierFreePage;
