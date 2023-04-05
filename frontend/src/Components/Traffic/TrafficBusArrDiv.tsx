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

interface TrafficBusArrDivProps {
	arrInfo: ArrInfoProps;
}

interface ArrInfoProps {
	route_no: number;
	expected_time_min: number;
	bus_stop_position: number;
	destination: string;
}

const TrafficBusArrDiv: React.FC<TrafficBusArrDivProps> = ({ arrInfo }) => {
	// TrafficBusArrDiv 컴포넌트

	return (
		<BusArrDiv>
			<div className="flexrow">
				<div className="">
					<em>{arrInfo.route_no}</em>
				</div>
				<div className="spanContainer">
					<span className="min">{arrInfo.expected_time_min}분</span>
					<span className="position">{arrInfo.bus_stop_position}정류장</span>
				</div>
			</div>
			<div className="direction">{arrInfo.destination}방면</div>
		</BusArrDiv>
	);
};

export default TrafficBusArrDiv;
