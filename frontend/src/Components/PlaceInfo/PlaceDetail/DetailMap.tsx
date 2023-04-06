import React, { useEffect, useState } from 'react';
import '../../../styles/MapDetail/DetailMap.css';
import roadsign from '../../../assets/img/detailmapIcon.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import busImg from '../../../assets/img/bus.png';

const { kakao } = window;

interface ArrInfo {
	route_no: number;
	expected_time_min: number;
	bus_stop_position: number;
	destination: string;
}

interface BusStopData {
	arr_infos: Array<ArrInfo>;
	dist: number;
	stop_id: number;
	stop_name: string;
}

interface DetailData {
	spotLat: number;
	spotLng: number;
}

// const busstopData = [
// 	{
// 		arr_infos: [{ bus_stop_position: 5, destination: '신탄진', expected_time_min: 7, route_no: 704 }],
// 		dist: 452.895383,
// 		stop_id: 44220,
// 		stop_name: '엑스포아파트',
// 	},
// 	{
// 		arr_infos: [{ bus_stop_position: 5, destination: '신탄진', expected_time_min: 7, route_no: 704 }],
// 		dist: 452.895383,
// 		stop_id: 44220,
// 		stop_name: '엑스포아파트',
// 	},
// 	{
// 		arr_infos: [{ bus_stop_position: 5, destination: '신탄진', expected_time_min: 7, route_no: 704 }],
// 		dist: 452.895383,
// 		stop_id: 44220,
// 		stop_name: '엑스포아파트',
// 	},
// 	{
// 		arr_infos: [{ bus_stop_position: 5, destination: '신탄진', expected_time_min: 7, route_no: 704 }],
// 		dist: 452.895383,
// 		stop_id: 44220,
// 		stop_name: '엑스포아파트',
// 	},
// ];

const DetailMap = () => {
	const { id } = useParams();
	const [detaildata, setDetaildata] = useState<DetailData>({ spotLat: 0, spotLng: 0 });
	const [busstopData, setBusstopData] = useState<BusStopData[]>([]);
	const getData = async () => {
		try {
			const response = await axios.get(`/api/spot/${id}`);
			console.log(response.data.data);
			setDetaildata(response.data.data);
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const getTrafficData = async () => {
			try {
				const response = await axios.get(
					`/api/bus/user/busInfo?userLat=${detaildata.spotLat}&userLng=${detaildata.spotLng}`
				);
				console.log(response.data);
				// setBusstopData(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		if (detaildata.spotLat && detaildata.spotLng) {
			getTrafficData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detaildata]);

	useEffect(() => {
		const options = {
			center: new kakao.maps.LatLng(detaildata.spotLat, detaildata.spotLng),
			level: 5,
			maxLevel: 8,
		};

		const container = document.getElementById('detailPageMap');
		const map = new kakao.maps.Map(container, options);

		const createAndSetMarker = (m: kakao.maps.Map, pos: kakao.maps.LatLng) => {
			const marker = new kakao.maps.Marker({
				position: pos,
			});
			marker.setMap(m);
			m.setCenter(pos);
		};
		createAndSetMarker(map, new kakao.maps.LatLng(detaildata?.spotLat, detaildata?.spotLng));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	});

	return (
		<div className="detailMapContainer">
			<div className="detailMapHead">
				<div className="detailMapHeadContent">
					<img src={roadsign} alt="icon" />
					<h1>주변 500m 이내 교통정보</h1>
				</div>
				<p className="detailMapHeadInfo">정류장 정보는 저상버스만 제공</p>
			</div>
			<div id="detailPageMap" />
			<div className="detailMapBusStopContainer">
				{busstopData?.map((data: BusStopData, index: number) => (
					<div key={index}>
						<div className="flex items-center">
							<img className="DetailMapIcon mr-3" src={busImg} alt="bus" />
							<p>
								{data.stop_name}에서 <span className='BusInfored'>{Math.floor(data.dist)}m</span>
							</p>
						</div>
						{data.arr_infos?.map((bus: ArrInfo, i: number) => (
							<div key={i} className="mt-2 flex items-center">
								<h2 className="mr-3">{bus.route_no}</h2>
								<p className="mr-3">{bus.expected_time_min}분</p>
								<p className="BusInfored">{bus.bus_stop_position}정류장 전</p>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default DetailMap;
