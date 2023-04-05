import React, { useCallback, useEffect, useState } from 'react';
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
import axios from 'axios';

const TrafficInfo = () => {
	interface ArrInfoProps {
		route_no: number;
		expected_time_min: number;
		bus_stop_position: number;
		destination: string;
	}

	interface TrafficInfo {
		stop_name: string;
		stop_id: number;
		dist: number; //float일수도?
		arr_infos: ArrInfoProps[];
	}

	interface TrafficInfoResponse {
		trafficInfoArr: TrafficInfo[];
	}

	const [trafficInfoArr, setTrafficInfoArr] = useState<TrafficInfo[]>([]);

	const trafficComponents = trafficInfoArr.length ? (
		trafficInfoArr.map((trafficInfo) => <TrafficInfoBody key={trafficInfo.stop_id} busStop={trafficInfo} />)
	) : (
		<div>주변 교통정보가 없습니다.</div>
	);

	// 장애인콜택시 버튼 클릭
	function LinkHandler() {
		window.location.href = 'tel:1588-1668';
	}

	// function LinkHandler() {
	// 	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	// 	if (isMobile) {
	// 		window.location.href = "tel:1588-1668";
	// 	} else {
	// 		window.open('https://www.djcall.or.kr/', '_blank');
	// 	}
	// }

	// const fetchTrafficInfo = () => {
	// 	const accessToken = localStorage.getItem('accessToken'); //내부함수 구현 어떻게 해놨는지 몰라서, 토큰 필요한지 모름. 일단 이렇게. 😀
	// 	const headers = {
	// 		'Content-type': 'application/json',
	// 		Authorization: `Bearer ${accessToken}`,
	// 	};
	// 	axios
	// 		.get<TrafficInfoResponse>(`https://j8b205.p.ssafy.io/api/donation`, { headers }) // api주소 모름 😀
	// 		.then((res) => {
	// 			// console.log(res);
	// 			// console.log(res.data);
	// 			// console.log('asdasd');
	// 			// const { trafficInfoArr } = res.data;
	// 			const { trafficInfoArr: newTrafficInfoArr } = res.data;

	// 			setTrafficInfoArr(newTrafficInfoArr);
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 		});
	// };

	const fetchTrafficInfo = useCallback(() => {
		const accessToken = localStorage.getItem('accessToken');
		const headers = {
			'Content-type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		};
		axios
			.get<TrafficInfoResponse>(`https://j8b205.p.ssafy.io/api/donation`, { headers })
			.then((res) => {
				const { trafficInfoArr: newTrafficInfoArr } = res.data;
				setTrafficInfoArr(newTrafficInfoArr);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	useEffect(() => {
		fetchTrafficInfo();
	}, [fetchTrafficInfo]); // 😀확인

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
			{trafficComponents}
		</>
	);
};

export default TrafficInfo;
