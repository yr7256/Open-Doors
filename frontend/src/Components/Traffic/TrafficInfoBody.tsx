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

const TrafficInfoBody = () => {
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

	return (
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
	);
};

export default TrafficInfoBody;
