import React, { useEffect, useState } from 'react';
import mapdata from '../../csvjson.json';
import '../../styles/Kakao/Kakao.css';
import Topbar from '../Topbar/Topbar';

const { kakao } = window;

let clickedOverlay = false;

const Kakao = () => {
	const [search, setSearch] = useState('');

	const onchangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event?.target.value);
	};

	useEffect(() => {
		const test = document.getElementById('test') as HTMLElement;
		const options = {
			center: new kakao.maps.LatLng(36.350475, 127.384834),
			level: 5,
			maxLevel: 13,
			// scrollwheel: false,
		};

		const container = document.getElementById('map');
		const map = new kakao.maps.Map(container, options);
		const clusterer = new kakao.maps.MarkerClusterer({
			map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
			averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
			minLevel: 6, // 클러스터 할 최소 지도 레벨
		});

		// 마커들을 저장할 변수 생성(마커 클러스터러 관련)
		let markers: kakao.maps.Marker[] = [];

		const ps = new kakao.maps.services.Places();

		const searchForm = document.getElementById("submit_btn");
		searchForm?.addEventListener("click", function (e) {
			e.preventDefault();
			searchPlaces();
		});

		const placesSearchCB = (data: any, status: kakao.maps.services.Status, pagination: string) => {
			if (status === kakao.maps.services.Status.OK) {
				displayPlaces(data);

				displayPagination(pagination);

				const bounds = new kakao.maps.LatLngBounds();
				for (let i = 0; i < data.length; i++) {
					displayMarker(data[i], i);
					// bounds.extend(new kakao.maps.LatLng(data[i].spotLat, data[i].spotLng));
					bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
				}

				map.setBounds(bounds);
			} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
				alert('검색 결과가 존재하지 않습니다.');
			} else if (status === kakao.maps.services.Status.ERROR) {
				alert('검색 결과 중 오류가 발생했습니다.');
			}
		}

		const searchPlaces = () => {
			const keyword = (document.getElementById('keyword') as HTMLInputElement).value;

			if (!keyword.replace(/^\s+|\s+$/g, '')) {
				alert('키워드를 입력해주세요!');
				return false;
			}

			// 여기서 검색 들어감 
			ps.keywordSearch(keyword, placesSearchCB);
		}

		const displayPlaces = (places: any) => {
			const listEl = document.getElementById('placesList') as HTMLElement;
			const menuEl = document.getElementById('menu_wrap') as HTMLElement;
			const fragment = document.createDocumentFragment();
			removeAllChildNods(listEl);
			removeMarker();
			for (let i = 0; i < places.length; i++) {
				// const placePosition = new kakao.maps.LatLng(places[i].spotLat, places[i].spotLng);
				const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
				const marker = addMarker(placePosition, i);
				const itemEl = getListItem(i, places[i]);

				fragment.appendChild(itemEl);
			}

			listEl?.appendChild(fragment);
			menuEl.scrollTop = 0;
		}

		const getListItem = (index: number, places: any) => {
			const el = document.createElement('li');

			let itemStr =
				'<span class="markerbg marker_' +
				(index + 1) +
				'">' +
				(index + 1) +
				'</span>' +
				'<div class="info">' +
				'   <h5>' +
				'이름 :' + places.place_name +
				'</h5>';

			if (places.road_address_name) {
				itemStr +=
					'    <span>' +
					'주소 :' + places.road_address_name +
					'</span>'
			} else {
				itemStr += '    <span>' + places.address_name + '</span>';
			}

			itemStr += '  <span class="tel">' + '전화번호 : ' + places.phone + '</span>' + '</div>';

			el.innerHTML = itemStr;
			el.className = 'item';

			return el;
		}
 
		const addMarker = (position: kakao.maps.LatLng, idx: number) => {
			const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
			const imageSize = new kakao.maps.Size(36, 37);
			const imgOptions = {
				spriteSize: new kakao.maps.Size(36, 691),
				spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
				offset: new kakao.maps.Point(13, 37),
			};

			const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);



			const marker = new kakao.maps.Marker({
				position,
				image: markerImage,
			});

			marker.setMap(map);
			markers.push(marker);

			return marker;
		}

		const removeMarker = () => {
			for (let i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
			markers = [];
			// console.log(markers);
		}

		const displayPagination = (pagination: any) => {
			const paginationEl = document.getElementById('pagination') as HTMLElement;
			const fragment = document.createDocumentFragment();
			while (paginationEl?.hasChildNodes()) {
				const lastChild = paginationEl.lastChild as ChildNode;
				paginationEl.removeChild(lastChild);
			}

			for (let i = 1; i <= pagination.last; i++) {
				const el = document.createElement('a');
				el.href = '#';
				el.innerHTML = String(i);

				if (i === pagination.current) {
					el.className = 'on';
				} else {
					el.onclick = (function (page: number) {
						return function () {
							pagination.gotoPage(page);
						};
					})(i);
				}

				fragment.appendChild(el);
			}
			paginationEl?.appendChild(fragment);
		}

		function removeAllChildNods(el: HTMLElement) {
			while (el.hasChildNodes()) {
				const lastChild = el.lastChild as ChildNode;
				el.removeChild(lastChild);
			}
		}

		const displayMarker = (data: any, idx: number) => {
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

			const closeBtn = document.createElement('button');
			closeBtn.className = 'closeBtn';
			closeBtn.innerHTML = '닫기';
			closeBtn.onclick = function () {
				// infowindow.setMap(null);
				test.style.display = 'none';
			};

			markers.push(marker);
			// console.log(markers);

			kakao.maps.event.addListener(marker, 'click', function () {
				if (clickedOverlay) {
					// clickedOverlay.setMap(null);
					// test!.textContent = null;
					clickedOverlay = false;
					test.style.display = 'none';
				}
				// infowindow.setMap(map);
				// clickedOverlay = infowindow;
				else clickedOverlay = true;
				test.innerHTML = `<p class="spotname">이곳의 이름은 ${data.spotName} 입니다.</p>
				<p>별점은 여기에 넣습니다. | 리뷰수는 여기에 넣습니다.</p>
				<p class="spotaddress">이곳의 주소는 ${data.spotAddress} 입니다.</p>
				<p>전화번호는 여기에 넣습니다.</p>
				<p>장애인 이용 가능 정보는 여기에 넣습니다.</p>`;
				test.style.display = 'block';
				test?.appendChild(closeBtn);
			});
		};

		for (let i = 0; i < mapdata.length; i++) {
			displayMarker(mapdata[i], i);
		}

		clusterer.addMarkers(markers);

		const position = new kakao.maps.LatLng(36.350475, 127.384834);
		map.setCenter(position);
	}, []);

	return (
		<div id="wrap">
			<Topbar />
			<div id="menuDiv">
				<div id="menu_wrap" className="bg_white">
					<div className="option">
							<div id="form">
								<input type="text" value={search} id="keyword" onChange={onchangeSearch} />
								<button type="submit" id="submit_btn">
									<span>검색</span>
								</button>
							</div>
					</div>
					<ul id="placesList"></ul>
					<div id="pagination"></div>
				</div>
			</div>
			<div id="map" />
			<div id="test" />
		</div>
	);
};

export default Kakao;
