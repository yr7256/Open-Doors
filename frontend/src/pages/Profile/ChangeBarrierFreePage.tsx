import React from 'react';
import { Head, Line } from '../../styles/Menu/NavStyle';
import Footer from '../../Components/Menu/Footer';
import ChangeBarrierFree from '../../Components/Auth/ChangeBarrierFree';

function ChangeBarrierFreePage() {
	return (
		<>
			<Head>배리어프리 항목 변경</Head>
			<Line />
			<ChangeBarrierFree />
			<Footer />
		</>
	);
}

export default ChangeBarrierFreePage;
