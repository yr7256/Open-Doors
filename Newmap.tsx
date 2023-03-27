import React, { useEffect, useState } from 'react';



declare const window: typeof globalThis & {
	kakao: any;
};

export default function Newmap() {
	useEffect(() => {
		let markers: any[] = [];

		const container = document.getElementById('map');
		const options = {
			center: new window.kakao.maps.LatLng(38.2313466, 128.2139293),
			level: 1,
		};
		const map = new window.kakao.maps.Map(container, options);

		const ps = new window.kakao.maps.services.Places();

		function placesSearchCB(data: any, status: any, pagination: any) {
			if (status === window.kakao.maps.services.Status.OK) {
				displayPlaces(data);

				displayPagination(pagination);

				const bounds = new window.kakao.maps.LatLngBounds();
				for (let i = 0; i < data.length; i++) {
					displayMarker(data[i]);
					bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
				}

				map.setBounds(bounds);
			} else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
				alert('검색 결과가 존재하지 않습니다.');
			} else if (status === window.kakao.maps.services.Status.ERROR) {
				alert('검색 결과 중 오류가 발생했습니다.');
			}
		}

		function displayMarker(place: any) {
			const marker = new window.kakao.maps.Marker({
				map,
				position: new window.kakao.maps.LatLng(place.y, place.x),
			});
			window.kakao.maps.event.addListener(marker, 'click', function (mouseEvent: any) {
				const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
				map.panTo(moveLatLon);
			});
		}

		function searchPlaces() {
			const keyword = (document.getElementById('keyword') as HTMLInputElement).value;

			if (!keyword.replace(/^\s+|\s+$/g, '')) {
				alert('키워드를 입력해주세요!');
				return false;
			}

			ps.keywordSearch(keyword, placesSearchCB);
		}

		function displayPlaces(places: any) {
			const listEl = document.getElementById('placesList');
			const searchForm = document.getElementById('submit_btn');
			searchForm?.addEventListener('click', function (e) {
				e.preventDefault();
				searchPlaces();
			});
			const menuEl = document.getElementById('menu_wrap');
			const fragment = document.createDocumentFragment();
			// const bounds = new window.kakao.maps.LatLngBounds();
			removeAllChildNods(listEl);
			removeMarker();
			for (let i = 0; i < places.length; i++) {
				const placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x);
				const marker = addMarker(placePosition, i);
				const itemEl = getListItem(i, places[i]);
				// bounds.extend(placePosition);

				fragment.appendChild(itemEl);
			}

			listEl?.appendChild(fragment);
			menuEl!.scrollTop = 0;

			// map.panTo(bounds);
		}

		function getListItem(index: any, places: any) {
			const el = document.createElement('li');

			let itemStr =
				'<span class="markerbg marker_' +
				(index + 1) +
				'"></span>' +
				'<div class="info">' +
				'   <h5>' +
				places.place_name +
				'</h5>';

			if (places.road_address_name) {
				itemStr +=
					'    <span>' +
					places.road_address_name +
					'</span>' +
					'   <span class="jibun gray">' +
					`<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
              </img>` +
					places.address_name +
					'</span>';
			} else {
				itemStr += '    <span>' + places.address_name + '</span>';
			}

			itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

			el.innerHTML = itemStr;
			el.className = 'item';

			return el;
		}

		function addMarker(position: any, idx: any) {
			const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
			const imageSize = new window.kakao.maps.Size(36, 37);
			const imgOptions = {
				spriteSize: new window.kakao.maps.Size(36, 691),
				spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
				offset: new window.kakao.maps.Point(13, 37),
			};

			const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

			const marker = new window.kakao.maps.Marker({
				position,
				image: markerImage,
			});

			marker.setMap(map);
			markers.push(marker);

			return marker;
		}

		function removeMarker() {
			for (let i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
			markers = [];
		}

		function displayPagination(pagination: any) {
			const paginationEl = document.getElementById('pagination') as any;
			const fragment = document.createDocumentFragment();
			while (paginationEl?.hasChildNodes()) {
				paginationEl.removeChild(paginationEl.lastChild);
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


		function removeAllChildNods(el: any) {
			while (el.hasChildNodes()) {
				el.removeChild(el.lastChild);
			}
		}
	}, []);

	const [search, setSearch] = useState('');

	const onchangeSearch = (event: any) => {
		setSearch(event?.target.value);
	};

	return (
		<div className="map_wrap">
			<div id="map"></div>
			<div id="menuDiv">
				<div id="menu_wrap" className="bg_white">
					<div className="option">
						<div>
							<div id="map_title">
								<div>단짠맛집</div>
							</div>

							<div id="form">
								<input type="text" value={search} id="keyword" onChange={onchangeSearch} />
								<button id="submit_btn" type="submit" />
							</div>
						</div>
					</div>

					<ul id="placesList"></ul>
					<div id="pagination"></div>
				</div>

				<div id="btnDiv">
					<div id="btnOn">
						<button id="searchBtn" type="button" />
					</div>
				</div>
			</div>
		</div>
	);
}
