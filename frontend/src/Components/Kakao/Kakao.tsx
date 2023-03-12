import React, { useEffect } from 'react';
import mapdata from '../../csvjson.json';

const { kakao } = window;

const Kakao = () => {
	useEffect(() => {
		const options = {
			center: new kakao.maps.LatLng(36.350475, 127.384834),
			level: 12,
		};
		// const mapdata = [
		// 	{ name: '대전광역시청', latlng: new kakao.maps.LatLng(36.350475, 127.384834) },
		// 	{ name: '시청역', latlng: new kakao.maps.LatLng(36.351271, 127.386788) },
		// ];

		const container = document.getElementById('map');
		const map = new kakao.maps.Map(container, options);
		const clusterer = new kakao.maps.MarkerClusterer({
			map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
			averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
			minLevel: 6, // 클러스터 할 최소 지도 레벨
		});

		// 마커들을 저장할 변수 생성(마커 클러스터러 관련)
		const markers: string[] = [];

		const displayMarker = (data: any) => {
			const marker = new kakao.maps.Marker({
				map: map,
				position: new kakao.maps.LatLng(data.spotLat, data.spotLng),
			});

			const infowindow = new kakao.maps.InfoWindow({
				disableAutoPan: true,
				zIndex: 1,
				content: `<div class="inactive infowindow""><span>${data.spotName}</span></div>`,
				removable: true,
				// map: map,
			});

			markers.push(marker);

			kakao.maps.event.addListener(marker, 'click', function () {
				// 마커 위에 인포윈도우를 표시합니다
				infowindow.open(map, marker);
			});
		};

		for (let i = 0; i < mapdata.length; i++) {
			displayMarker(mapdata[i]);
		}

		clusterer.addMarkers(markers);

		const position = new kakao.maps.LatLng(36.350475, 127.384834);
		map.setCenter(position);
	}, []);

	return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
};

export default Kakao;
