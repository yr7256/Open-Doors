import React, { useEffect } from 'react';
import mapdata from '../../csvjson.json';
import '../../styles/Kakao/Kakao.css';

const { kakao } = window;

let clickedOverlay: any = null;

const Kakao = () => {
	useEffect(() => {
		const test = document.getElementById('test')
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

			// const content = `<div class="inactive infowindow"><span>${data.spotName}</span></div>`;

			// const infowindow = new kakao.maps.CustomOverlay({
				// disableAutoPan: true,
				// position: new kakao.maps.LatLng(data.spotLat, data.spotLng),
				// zIndex: 1,
				// content: `<div id="popup_map" class="inactive infowindow"><span>${data.spotName}</span></div>`,
				// content: content,
				// removable: true,
				// map: map,
			// });

			const content = document.createElement('div');
			content.className = 'infowindow';
			content.innerHTML = data.spotName;

			const closeBtn = document.createElement('button');
			closeBtn.innerHTML = '닫기';
			closeBtn.onclick = function () {
				// infowindow.setMap(null);
				test!.style.display = 'none';
			};
			// content.appendChild(closeBtn);
			test?.appendChild(closeBtn);
			// infowindow.setContent(content);

			markers.push(marker);

			kakao.maps.event.addListener(marker, 'click', function () {
				if (clickedOverlay) {
					// clickedOverlay.setMap(null);
					clickedOverlay = null;
					test!.style.display = 'none';
				} else
				// infowindow.setMap(map);
				// clickedOverlay = infowindow;
				clickedOverlay = 'open';
				test!.textContent = data.spotName;
				test!.style.display = 'block'
				test?.appendChild(closeBtn);
			});
		};

		for (let i = 0; i < mapdata.length; i++) {
			displayMarker(mapdata[i]);
		}

		clusterer.addMarkers(markers);

		const position = new kakao.maps.LatLng(36.350475, 127.384834);
		map.setCenter(position);
	}, []);

	return (
		<div id="wrap">
			<div id="map" />
			<div id="test"> 11 </div>
		</div>
	);
};

export default Kakao;
