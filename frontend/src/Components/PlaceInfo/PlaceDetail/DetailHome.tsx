import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import {
	Img,
	Number,
	Line,
	Icon,
	BigIcon,
	Container,
	Names,
	Menus,
	NoNumber,
} from '../../../styles/MapDetail/DetailHomestyle';
import location from '../../../assets/img/location.png';
import call from '../../../assets/img/call.png';

//barrierfree 아이콘 import
import disabledElv from '../../../assets/img/Barrierfree/disabled-elevator.png';
import elevator from '../../../assets/img/Barrierfree/elevator.png';
import family from '../../../assets/img/Barrierfree/family.png';
import firstFloor from '../../../assets/img/Barrierfree/first-floor.png';
import guideDog from '../../../assets/img/Barrierfree/guidedog.png';
import parking from '../../../assets/img/Barrierfree/parking.png';
import toilet from '../../../assets/img/Barrierfree/toilet.png';
import wheelchair from '../../../assets/img/Barrierfree/wheelchair.png';

function DetailHome() {
	const { id } = useParams();
	const [placeDetail, setPlaceDetail] = useState<[]>([]);

	// 위치, 운영시간, 번호, 정보, 편의시설 정보, 메뉴 useState 에 담기
	const [placeImage, setPlaceImage] = useState<any>([]);
	const [placeLocation, setPlaceLocation] = useState('');
	const [placeMenus, setPlaceMenus] = useState<[]>([]);
	const [placePhoneNumber, setPhoneNumber] = useState('');
	const [placeBarrierFree, setPlaceBarrierFree] = useState<[]>([]);

	// dropbarrierfree
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const onToggle = () => setIsOpen(!isOpen);
	const onOptionClicked = (value: string, index: number) => () => {
		setIsOpen(false);
	};

	useEffect(() => {
		axios.get(`https://j8b205.p.ssafy.io/api/spot/${id}`).then((res) => {
			setPlaceDetail(res.data);

			if (res.data.data.spotAddress === '') {
				setPlaceLocation('위치 정보가 없습니다.');
			} else {
				setPlaceLocation(res.data.data.spotAddress);
			}

			setPlaceMenus(res.data.data.menus);
			if (res.data.data.spotTelNumber === '') {
				setPhoneNumber('');
			} else {
				setPhoneNumber(res.data.data.spotTelNumber);
			}
			setPlaceBarrierFree(res.data.data.spotSfInfos);

			const imgArr: any[] = [];
			res.data.data.images.map((img: any, index: number) => {
				// axios.get(`http://192.168.31.134:8080/api/spot/image/4/${img.pathName}`).then((response) => {
				// 	// images.append(response.config.url);
				// 	console.log(response);
				// 	setPlaceImage([...placeImage, response.config.url]);
				// });
				const a = async () => {
					const b = await axios.get(`https://j8b205.p.ssafy.io/api/spot/image/${id}/${img.pathName}`);
					imgArr.push(b.config.url);
					if (index === res.data.data.images.length - 1) {
						setPlaceImage(imgArr);
					}
				};
				a();
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// barrierfree 종류
	const BarrierFreeList = [
		{ id: 1, sfName: '휠체어 접근 가능', image: wheelchair },
		{ id: 2, sfName: '해당 장소가 1층에 위치함', image: firstFloor },
		{ id: 3, sfName: '장애인 화장실 있음', image: toilet },
		{ id: 4, sfName: '애완견/도우미견 출입가능', image: guideDog },
		{ id: 5, sfName: '장애인 엘리베이터 있음', image: disabledElv },
		{ id: 6, sfName: '엘리베이터 있음', image: elevator },
		{ id: 7, sfName: '건물 내 무료주차 가능', image: parking },
		{ id: 8, sfName: '가족/어린이 이용에 적합', image: family },
	];

	// 일치하는 barrierfree만 출력
	const mapBarrierFree = placeBarrierFree.map((v: any) => {
		return v.sfInfo.id;
	});

	const barrierFree = BarrierFreeList.filter((v: any) => {
		return mapBarrierFree.includes(v.id);
	});

	const barrierFreeNames = barrierFree.map((v: any) => v.sfName);
	const barrierFreeImages = barrierFree.map((v: any) => v.image);

	// console.log(placePhoneNumber);

	return (
		<>
			<div className="grid grid-cols-12 gap-1">
				<div className="col-start-2 col-span-1">
					<Img src={location} alt="location" />
				</div>
				<div className="col-start-3 col-span-9">
					<h4>{placeLocation}</h4>
				</div>
			</div>
			<br />
			<div className="grid grid-cols-12 gap-1">
				<div className="col-start-2 col-span-1">
					<Img src={call} alt="call" />
				</div>
				{placePhoneNumber === '' ? (
					<div className="col-start-3 col-span-9">
						<NoNumber>전화 번호가 없습니다.</NoNumber>
					</div>
				) : (
					<div className="col-start-3 col-span-9">
						<Number>{placePhoneNumber}</Number>
					</div>
				)}
			</div>
			<Line />
			<div className="grid grid-cols-12 gap-1">
				<div className="col-start-2 col-span-4">
					<h4 onClick={onToggle}>편의시설 정보</h4>
				</div>
				<div className="col-start-6 col-span-1">
					<FontAwesomeIcon className="FaIcon" icon={faChevronDown} onClick={onToggle} />
				</div>
			</div>
			<br />
			<div className="grid grid-cols-12 gap-1">
				<div className="col-start-2 col-span-10">
					<Container>
						{barrierFreeImages.map((v: any) => (
							<BigIcon key={v} src={v} alt="icon" />
						))}
					</Container>
				</div>
			</div>
			<br />
			<div>
				{isOpen && (
					<div className="grid grid-cols-16 gap-1">
						<div className="col-start-2 col-span-1">
							{barrierFreeImages.map((v: any) => (
								<Icon key={v} src={v} alt="icon" />
							))}
						</div>
						<div className="col-start-3 col-span-4">
							{barrierFreeNames.map((v: any) => (
								<Names key={v}>{v}</Names>
							))}
						</div>
					</div>
				)}
			</div>
			<Line />
			{placeMenus.length === 0 ? (
				<>
					<br />
					<br />
					<br />
					<br />
				</>
			) : (
				<>
					<div className="grid grid-cols-12 gap-1">
						<div className="col-start-2 col-span-2">
							<h4>메뉴</h4>
						</div>
					</div>
					<br />
					<div className="grid grid-cols-12 gap-1">
						<div className="col-start-2 col-span-8">
							{placeMenus.map((v: any) => (
								<Menus key={v}>{v.title}</Menus>
							))}
						</div>
						<div className="col-start-10 col-span-5">
							{placeMenus.map((v: any) => (
								<Menus key={v}>{v.price}</Menus>
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default DetailHome;
