import React, { useEffect, useState } from 'react';
// import mapdata from '../../csvjson.json';
import '../../styles/Kakao/Kakao.css';
import Topbar from '../Topbar/Topbar';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';
// import Detail from '../DetailPage/Detail';
import Modal from '../Menu/Modal';
import WheelChairElevator from '../../assets/img/Barrierfree/disabled-elevator.png';
import Elevator from '../../assets/img/Barrierfree/elevator.png';
import Severalpeople from '../../assets/img/Barrierfree/family.png';
import FirstFloor from '../../assets/img/Barrierfree/first-floor.png';
import GuideDog from '../../assets/img/Barrierfree/guidedog.png';
import FreeParking from '../../assets/img/Barrierfree/parking.png';
import DisabledToilet from '../../assets/img/Barrierfree/toilet.png';
import WheelChair from '../../assets/img/Barrierfree/wheelchair.png';
import star from '../../assets/img/star.png';
import axios from 'axios';

const { kakao } = window;

interface MapProps {
	mapdata: any;
}
const sfImages: { [key: string]: string } = {
	'WheelChair Elevator': WheelChairElevator,
	Elevator: Elevator,
	'Several people': Severalpeople,
	'First Floor': FirstFloor,
	'Guide Dog': GuideDog,
	'Free Parking': FreeParking,
	'Disabled Toilet': DisabledToilet,
	WheelChair: WheelChair,
};

const Kakao = (props: MapProps) => {
	const { mapdata } = props;
	const [search, setSearch] = useState('');
	const [searchData, setSearchData] = useState([]) as any[];
	const [detailData, setDetailData] = useState([]) as any[];
	const [modalState, setModalState] = useState(false);
	const navigate = useNavigate();
	const openModal = () => {
		setModalState(true);
	};
	const closeModal = () => {
		setModalState(false);
	};

	const onchangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event?.target.value);
	};

	const goDetailpage = () => {
		navigate(`/map/detail/${detailData?.id}`);
		// <Link to={`/map/${detailData.spotPlaceId}`} />
	};

	useEffect(() => {
		const options = {
			center: new kakao.maps.LatLng(36.350475, 127.384834),
			level: 5,
			maxLevel: 8,
		};

		const container = document.getElementById('map');
		const map = new kakao.maps.Map(container, options);
		// kakao.maps.event.addListener(map, 'tilesloaded', () => {

		let listenerFired = false;

		const listener = kakao.maps.event.addListener(map, 'idle', () => {
			if (!listenerFired) {
				listenerFired = true;
				const clusterer = new kakao.maps.MarkerClusterer({
					map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
					averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
					minLevel: 6, // 클러스터 할 최소 지도 레벨
				});

				// 마커들을 저장할 변수 생성(마커 클러스터러 관련)
				let markers: kakao.maps.Marker[] = [];

				const ps = new kakao.maps.services.Places();

				const searchForm = document.getElementById('submit_btn');
				searchForm?.addEventListener('click', function (e) {
					e.preventDefault();
					// searchPlaces();
					searchPlaces();
					console.log('검색');
				});

				// const placesSearchCB = (data: any, status: kakao.maps.services.Status, pagination: string) => {
				// 	if (status === kakao.maps.services.Status.OK) {
				// 		displayPlaces(data);

				// 		displayPagination(pagination);

				// 		const bounds = new kakao.maps.LatLngBounds();
				// 		for (let i = 0; i < data.length; i++) {
				// 			displayMarker(data[i], i);
				// 			// bounds.extend(new kakao.maps.LatLng(data[i].spotLat, data[i].spotLng));
				// 			bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
				// 		}

				// 		map.setBounds(bounds);
				// 	} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
				// 		alert('검색 결과가 존재하지 않습니다.');
				// 	} else if (status === kakao.maps.services.Status.ERROR) {
				// 		alert('검색 결과 중 오류가 발생했습니다.');
				// 	}
				// };

				const searchKeyword = async (keyword: string) => {
					try {
						const response = await axios.get(`api/spots/search/${encodeURIComponent(keyword)}`);
						console.log(response);
					} catch (error) {
						console.log(error);
					}
				};

				const searchPlaces = () => {
					const keyword = (document.getElementById('keyword') as HTMLInputElement).value;
					searchKeyword(keyword);
				};

				// 	// 여기서 검색 들어감
				// 	ps.keywordSearch(keyword, placesSearchCB);
				// };

				// const displayPlaces = (places: any) => {
				// 	const listEl = document.getElementById('placesList') as HTMLElement;
				// 	const menuEl = document.getElementById('menu_wrap') as HTMLElement;
				// 	const fragment = document.createDocumentFragment();
				// 	removeAllChildNods(listEl);
				// 	removeMarker();
				// 	for (let i = 0; i < places.length; i++) {
				// 		// const placePosition = new kakao.maps.LatLng(places[i].spotLat, places[i].spotLng);
				// 		const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
				// 		const marker = addMarker(placePosition, i);
				// 		const itemEl = getListItem(i, places[i]);

				// 		fragment.appendChild(itemEl);
				// 	}

				// 	listEl?.appendChild(fragment);
				// 	menuEl.scrollTop = 0;
				// };

				// const getListItem = (index: number, places: any) => {
				// 	const el = document.createElement('li');

				// 	let itemStr =
				// 		'<span class="markerbg marker_' +
				// 		(index + 1) +
				// 		'">' +
				// 		(index + 1) +
				// 		'</span>' +
				// 		'<div class="info">' +
				// 		'   <h5>' +
				// 		'이름 :' +
				// 		places.place_name +
				// 		'</h5>';

				// 	if (places.road_address_name) {
				// 		itemStr += '    <span>' + '주소 :' + places.road_address_name + '</span>';
				// 	} else {
				// 		itemStr += '    <span>' + places.address_name + '</span>';
				// 	}

				// 	itemStr += '  <span class="tel">' + '전화번호 : ' + places.phone + '</span>' + '</div>';

				// 	el.innerHTML = itemStr;
				// 	el.className = 'item';

				// 	return el;
				// };

				// const addMarker = (position: kakao.maps.LatLng, idx: number) => {
				// 	const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
				// 	const imageSize = new kakao.maps.Size(36, 37);
				// 	const imgOptions = {
				// 		spriteSize: new kakao.maps.Size(36, 691),
				// 		spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
				// 		offset: new kakao.maps.Point(13, 37),
				// 	};

				// 	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

				// 	const marker = new kakao.maps.Marker({
				// 		position,
				// 		image: markerImage,
				// 	});

				// 	marker.setMap(map);
				// 	markers.push(marker);

				// 	return marker;
				// };

				const removeMarker = () => {
					for (let i = 0; i < markers.length; i++) {
						markers[i].setMap(null);
					}
					markers = [];
					// console.log(markers);
				};

				// const displayPagination = (pagination: any) => {
				// 	const paginationEl = document.getElementById('pagination') as HTMLElement;
				// 	const fragment = document.createDocumentFragment();
				// 	while (paginationEl?.hasChildNodes()) {
				// 		const lastChild = paginationEl.lastChild as ChildNode;
				// 		paginationEl.removeChild(lastChild);
				// 	}

				// 	for (let i = 1; i <= pagination.last; i++) {
				// 		const el = document.createElement('a');
				// 		el.href = '#';
				// 		el.innerHTML = String(i);

				// 		if (i === pagination.current) {
				// 			el.className = 'on';
				// 		} else {
				// 			el.onclick = (function (page: number) {
				// 				return function () {
				// 					pagination.gotoPage(page);
				// 				};
				// 			})(i);
				// 		}

				// 		fragment.appendChild(el);
				// 	}
				// 	paginationEl?.appendChild(fragment);
				// };

				// const removeAllChildNods = (el: HTMLElement) => {
				// 	while (el.hasChildNodes()) {
				// 		const lastChild = el.lastChild as ChildNode;
				// 		el.removeChild(lastChild);
				// 	}
				// }

				const displayMarker = (data: any, idx: number) => {
					const marker = new kakao.maps.Marker({
						map: map,
						position: new kakao.maps.LatLng(data.spotLat, data.spotLng),
					});

					markers.push(marker);
					// console.log(markers);

					kakao.maps.event.addListener(marker, 'click', () => {
						// console.log(data);
						if (modalState) {
							closeModal();
							setDetailData([]);
						}
						setDetailData(data);
						openModal();
					});
				};

				for (let i = 0; i < mapdata.length; i++) {
					if (mapdata[i].state === 'access') {
						displayMarker(mapdata[i], i);
					}
				}

				clusterer.addMarkers(markers);
			}
		});

		if (navigator.geolocation) {
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition(function (position) {
				const lat = position.coords.latitude, // 위도
					lon = position.coords.longitude; // 경도
				const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
				map.setCenter(locPosition);
			});
		} else {
			const locPosition = new kakao.maps.LatLng(36.350475, 127.384834);
			map.setCenter(locPosition);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mapdata]);

	return (
		<>
			<Topbar />
			<div id="menuDiv">
				<div id="menu_wrap" className="bg_white">
					<form className="flex items-center" id="form">
						<label htmlFor="keyword" className="sr-only">
							Search
						</label>
						<div className="relative" id="searchBarContainer">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-gray-500 dark:text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										clipRule="evenodd"
									></path>
								</svg>
							</div>
							<input
								type="text"
								value={search}
								id="keyword"
								onChange={onchangeSearch}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search"
								required
							/>
						</div>
						<button
							type="submit"
							id="submit_btn"
							className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
							<span className="sr-only">Search</span>
						</button>
					</form>
				</div>
			</div>
			<ul id="placesList"></ul>
			<div id="pagination"></div>
			<div id="map" />
			<Modal id="marker" title={detailData.id} show={modalState} handleClose={() => closeModal()}>
				<div className="modalInfo" onClick={goDetailpage}>
					<h1 className="spotname">{detailData.spotName}</h1>
					<div className="bfImgs">
						<img src={star} className="smallIcon" alt="" />
						<p>
							{detailData.reviewScore} / 5 | 리뷰수 : {detailData.reviewCount}
						</p>
					</div>
					<p className="spotaddress">{detailData.spotAddress}</p>
					<p>{detailData.spotTelNumber}</p>
					<div className="bfImgs">
						{detailData?.spotSfInfos?.map((item: any) => (
							<div key={item.id}>
								<img className="Icon" src={sfImages[item.sfInfo.sfName]} alt="" />
							</div>
						))}
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Kakao;
