import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Container, Bottom } from '../../styles/Kakao/SearchAddress';

const SearchAddressMap = () => {
	const [lat, setLat] = useState<number>();
	const [lng, setLng] = useState<number>();
	const [address, setAddress] = useState();


	const navigate = useNavigate();

	const goregister = () => {
		navigate('/map/newlocation', { state: {address, lat, lng} });
	};

	useEffect(() => {
		const geocoder = new kakao.maps.services.Geocoder();
		const options = {
			center: new kakao.maps.LatLng(36.350475, 127.384834),
			level: 5,
			maxLevel: 13,
			isPanto: true,
		};
		const container = document.getElementById('map') as HTMLElement;
		const map = new kakao.maps.Map(container, options);

		function searchDetailAddrFromCoords(coords: kakao.maps.LatLng, callback: any) {
			// 좌표로 법정동 상세 주소 정보를 요청합니다
			geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
		}
		function displayMarker(locPosition: kakao.maps.LatLng) {
			// 마커를 생성합니다
			const marker = new kakao.maps.Marker({
				map: map,
				position: locPosition,
			});

			// 지도 중심좌표를 접속위치로 변경합니다
			map.setCenter(locPosition);
			kakao.maps.event.addListener(map, 'drag', function () {
				const center = map.getCenter();
				marker.setPosition(center);
				// console.log(center);
			});
			kakao.maps.event.addListener(map, 'zoom_changed', function () {
				const center = map.getCenter();
				marker.setPosition(center);
				// console.log(center);
			});
			kakao.maps.event.addListener(map, 'idle', function () {
				searchDetailAddrFromCoords(
					map.getCenter(),
					function (result: any, status: kakao.maps.services.Status) {
						if (status === kakao.maps.services.Status.OK) {
							const detailAddr = result[0].road_address
								? result[0].road_address.address_name
								: result[0].address.address_name;
							// detailAddr += result[0].address.address_name;
							// console.log(result[0])

							const content = '<div class="bAddr">' + detailAddr + '</div>';

							// 마커를 클릭한 위치에 표시합니다
							marker.setPosition(map.getCenter());
							// console.log(content);
							setLat(marker.getPosition().getLat());
							setLng(marker.getPosition().getLng());
							setAddress(detailAddr);
						}
					}
				);
			});
		}

		if (navigator.geolocation) {
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition(function (position) {
				const lat = position.coords.latitude, // 위도
					lon = position.coords.longitude; // 경도

				const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

				// 마커와 인포윈도우를 표시합니다
				displayMarker(locPosition);
			});
		} else {
			const locPosition = new kakao.maps.LatLng(36.350475, 127.384834);
			displayMarker(locPosition);
		}
	}, []);
	return (
		<Container className="container">
			<p>지도를 움직여 아이콘을 원하는 위치로 옮기세요.</p>
			<div id="map" />
			<Bottom>
				<p>{address}</p>
				<button onClick={goregister}>변경</button>
			</Bottom>
			<Outlet />
		</Container>
	);
};

export default SearchAddressMap;
