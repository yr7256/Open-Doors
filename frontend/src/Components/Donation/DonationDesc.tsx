import React, { useEffect } from 'react';
import { DonationDescStyle } from '../../styles/Donation/DonationStyled';
import together from '../../assets/img/together.png';

function DonationDesc() {
	function LinkHandler() {
		window.open('https://www.childfund-daejeon.or.kr/xe/', '_blank');
	}

	return (
		<DonationDescStyle>
			<span>여러분의 소중한 포인트를 기부하세요.</span>
			<br />
			<span>open doors는</span> <em>매달</em> <span>모금함에 모인 포인트를</span>
			<br />
			<em>대전종합사회복지관</em>
			<span>에 기부합니다.</span>
			<br />
			<div className="linkDiv" onClick={LinkHandler}>
				<img src={together} alt="퍼즐조각" />
				<a>대전종합사회복지관 바로가기</a>
			</div>
		</DonationDescStyle>
	);
}

export default DonationDesc;
