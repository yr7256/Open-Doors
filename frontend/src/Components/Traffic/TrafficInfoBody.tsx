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
	NoTrafficInfo,
	BusStopInfo,
	BusStopNum,
	BusIcon,
} from '../../styles/Traffic/TrafficStyled';

import TrafficBusArrDiv from './TrafficBusArrDiv';

interface TrafficInfoBodyProps {
	busStop: BusStopProps;
}

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

const TrafficInfoBody: React.FC<TrafficInfoBodyProps> = ({ busStop }) => {
	const busArrComponents =
		busStop.arr_infos.length > 0 ? (
			busStop.arr_infos.map((arrInfo, idx) => <TrafficBusArrDiv key={idx} arrInfo={arrInfo} />)
		) : (
			<NoTrafficInfo>해당 정류장의 도착정보가 없습니다.</NoTrafficInfo>
		);

	return (
		<TrafficInfoBox>
			<BusStopInfo>
				<BusIcon src={bus} alt="버스아이콘"></BusIcon>
				<span className="busStopTitle">{busStop.stop_name}</span>
				<span className="busStopNum">{`(${busStop.stop_id})`}</span>
				<BusStopNum>{Math.round(busStop.dist)}m</BusStopNum>
			</BusStopInfo>
			<div className="horizontalLine" />

			{busArrComponents}
		</TrafficInfoBox>
	);
};

export default TrafficInfoBody;
