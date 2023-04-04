import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { Img, Number, Line, Icon, BigIcon } from '../../../styles/MapDetail/DetailHomestyle';
import location from '../../../assets/img/location.png';
import call from '../../../assets/img/call.png';

//barrierfree 아이콘 import
import charge from '../../../assets/img/Barrierfree/charge.png';
import disabledElv from '../../../assets/img/Barrierfree/WheelChair Elevator.png';
import elevator from '../../../assets/img/Barrierfree/Elevator.png';
import family from '../../../assets/img/Barrierfree/Several people.png';
import firstFloor from '../../../assets/img/Barrierfree/First Floor.png';
import guideDog from '../../../assets/img/Barrierfree/Guide Dog.png';
import parking from '../../../assets/img/Barrierfree/Free Parking.png';
import toilet from '../../../assets/img/Barrierfree/Disabled Toilet.png';
import wheelchair from '../../../assets/img/Barrierfree/WheelChair.png';

function DetailHome() {
	const { id } = useParams();
	const [placeDetail, setPlaceDetail] = useState<[]>([]);

	// 위치, 운영시간, 번호, 정보, 편의시설 정보, 메뉴 useState 에 담기
	const [placeImage, setPlaceImage] = useState<any>([]);
	const [placeLocation, setPlaceLocation] = useState('');
	const [placeMenus, setPlaceMenus] = useState<[]>([]);
	const [placePhoneNumber, setPhoneNumber] = useState('');
	const [placeBarrierFree, setPlaceBarrierFree] = useState<[]>([]);
	const [placeReviewRate, setPlaceReviewRate] = useState('');

	// dropbarrierfree
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const onToggle = () => setIsOpen(!isOpen);
	const onOptionClicked = (value: string, index: number) => () => {
		setIsOpen(false);
	};

	useEffect(() => {
		axios.get(`https://j8b205.p.ssafy.io/api/spot/${id}`).then((res) => {
			setPlaceDetail(res.data);
			console.log(res.data);

			if (res.data.data.spotAddress === '') {
				setPlaceLocation('위치 정보가 없습니다.');
			} else {
				setPlaceLocation(res.data.data.spotAddress);
			}

			setPlaceMenus(res.data.menus);
			if (res.data.data.spotTelNumber === '') {
				setPhoneNumber('장소 번호가 없습니다.');
			} else {
				setPhoneNumber(res.data.data.spotTelNumber);
			}
			setPlaceBarrierFree(res.data.data.spotSfInfos);

			const imgArr: any[] = [];
			res.data.data.images.map((img: any, index: any) => {
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
	const mapBarrierFree = placeBarrierFree.map((idx: any) => {
		// return <div key={idx}>{idx}</div>;
		return idx.sfInfo.id;
	});
	console.log(mapBarrierFree);
	const [barrierFreeImage, setBarrierFreeImage] = useState<[]>([]);
	const [barrierFreeName, setBarrierFreeName] = useState<[]>([]);
	const barrierFree = BarrierFreeList.map((v: any) => {
		mapBarrierFree.map((i: any) => {
			if (v.id === i) {
				console.log(v.image);
			}
		});
	});
	// const SameBarrierFree = BarrierFreeList.filter((data => data.id === ))

	// console.log(SameBarrierFree);
	// 리뷰 개수, 리뷰 별점 가져오기
	useEffect(() => {
		axios.get(`https://j8b205.p.ssafy.io/api/review/${id}`).then((res) => {
			setPlaceReviewRate(res.data);
			console.log(res.data);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				<div className="col-start-3 col-span-9">
					<Number>{placePhoneNumber}</Number>
				</div>
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
			<div className="grid grid-cols-8 gap-1">
				<div className="col-start-2 col-span-1">
					<BigIcon src={wheelchair} alt="big-icon" />
				</div>
			</div>
			<div>
				{isOpen && (
					<div className="grid grid-cols-16 gap-1">
						<div className="col-start-2 col-span-1">
							<Icon src={wheelchair} alt="icon" />
						</div>
						<div className="col-start-3 col-span-4">
							<h4>{BarrierFreeList[0].sfName}</h4>
						</div>
					</div>
				)}
			</div>
			<Line />
			<div className="grid grid-cols-12 gap-1">
				<div className="col-start-2 col-span-2">
					<h4>메뉴</h4>
				</div>
			</div>
		</>
	);
}

export default DetailHome;
