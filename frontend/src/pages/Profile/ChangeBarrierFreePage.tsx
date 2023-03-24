import React from 'react';
import { Head, Line } from '../../styles/Nav/NavStyle';
import ChangeBarrierFree from '../../Components/Auth/ChangeBarrierFree';

function ChangeBarrierFreePage() {
	return (
		<>
			<Head>배리어프리 항목 변경</Head>
			<Line />
			<ChangeBarrierFree />
		</>
	);
}

export default ChangeBarrierFreePage;
