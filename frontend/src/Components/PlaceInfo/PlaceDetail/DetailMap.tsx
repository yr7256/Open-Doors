import React, { useEffect } from 'react';
import '../../../styles/MapDetail/DetailMap.css';
import roadsign from '../../../assets/img/detailmapIcon.png';

const { kakao } = window;

const DetailMap = () => {
	// 교통정보 끝나면 함수 받아서 등록하기
	useEffect(() => {
		const options = {
			center: new kakao.maps.LatLng(36.350475, 127.384834),
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

		if (navigator.geolocation) {
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition(function (position) {
				const lat = position.coords.latitude, // 위도
					lon = position.coords.longitude; // 경도
				const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
				createAndSetMarker(map, locPosition);
			});
		} else {
			const locPosition = new kakao.maps.LatLng(36.350475, 127.384834);
			createAndSetMarker(map, locPosition);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	});
	return (
		<>
			<div className="detailMapHead">
				<div className='detailMapHeadContent'>
					<img src={roadsign} alt="icon" />
					<h1>주변 500m 이내 교통정보</h1>
				</div>
				<p className='detailMapHeadInfo'>정류장 정보는 저상버스만 제공</p>
			</div>
			<div id="detailPageMap" />
		</>
	);
};

export default DetailMap;
