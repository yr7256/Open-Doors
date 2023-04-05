import React from 'react';
import bus from '../../assets/img/bus.png';
import subway from '../../assets/img/subway.png';
import calltaxi from '../../assets/img/calltaxi.png';

import {
	TrafficInfoHeader,
	TrafficInfoHeaderContainer,
	LineDiv,
	TaxiCallDiv,
	TrafficTitleWrapper,
	TrafficInfoBox,
	BusArrDiv,
} from '../../styles/Traffic/TrafficStyled';

const TrafficInfo = () => {
	function LinkHandler() {
		window.open('https://www.djcall.or.kr/', '_blank');
	}

	return (
		<>
			<TrafficInfoHeaderContainer>
				<TrafficInfoHeader>
					<span>주변 </span>
					<em>300m </em>
					<span>교통 정보</span>
				</TrafficInfoHeader>
			</TrafficInfoHeaderContainer>
			<LineDiv />
			<TaxiCallDiv onClick={LinkHandler}>
				<img src={calltaxi} alt="수화기사진" />
				<span>콜택시를 이용한다면?</span>
				<a>장애인 콜택시 예약</a>
			</TaxiCallDiv>
			<LineDiv />
			<TrafficTitleWrapper>
				<span>주변 </span>
				<em>저상버스</em>
				<span>/지하철</span>
			</TrafficTitleWrapper>

			{/* 아래는 map 돌려서.. 삼항연산자로 없으면 없다고.. */}
			<TrafficInfoBox>
				<img src={bus} alt="버스아이콘"></img>
				<div className="busStopInfo">
					<span className="busStopTitle">{'삼성화재연수원'}</span>
					<span className="busStopNum">{'(11052)'}</span>
				</div>
				<div className="horizontalLine" />

				{/* BusArrDiv 비어있으면? */}
				<BusArrDiv>
					<div className="flexrow">
						<div className="">
							<em>{'102'}</em>
						</div>
						<div className="spanContainer">
							<span className="min">{4}분</span>
							<span className="position">{4}정류장</span>
						</div>
					</div>
					<div className="direction">{'한밭대학교방면'}</div>
				</BusArrDiv>
			</TrafficInfoBox>
		</>
	);
};

export default TrafficInfo;
