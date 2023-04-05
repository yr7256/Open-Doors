import React from 'react';
import bus from '../../assets/img/bus.png';
import subway from '../../assets/img/subway.png';
import calltaxi from '../../assets/img/calltaxi.png';
import TrafficInfoBody from './TrafficInfoBody';

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
	interface ArrInfoProps {
		route_no: number;
		expected_time_min: number;
		bus_stop_position: number;
		destination: string;
	}

	interface BusStopProps {
		stop_name: string;
		stop_id: number;
		dist: number;
		arr_infos: ArrInfoProps[];
	}

	function LinkHandler() {
		window.open('https://www.djcall.or.kr/', '_blank');
	}
	// async await로 axios recom/bus_info😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀
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
			<TrafficInfoBody />
		</>
	);
};

export default TrafficInfo;
